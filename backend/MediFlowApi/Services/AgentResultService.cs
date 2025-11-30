using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using MediFlow.Models;
using MediFlowApi.Models;

namespace MediFlowApi.Services
{
    public class AgentResultService
    {
        private readonly HttpClient myHttpClient;
        private readonly string myApiKey;
        private readonly AppointmentService myAppointmentService;
        private readonly TimeSlotService myTimeSlotService;
        private readonly JsonSerializerOptions myJsonOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            WriteIndented = true
        };

        public AgentResultService(HttpClient client, IConfiguration config, AppointmentService appService, TimeSlotService timeSlotService)
        {
            myHttpClient = client;
            myApiKey = config["OpenAI:ApiKey"]?.Trim()
                ?? throw new InvalidOperationException("Missing OpenAI API key");
            myAppointmentService = appService;
            myTimeSlotService = timeSlotService;
        }

        public async Task<List<AgentResult>> ProcessPatientMessageAsync(AgentMessage message, CancellationToken ct = default)
        {
            // 1) získaj voľné sloty (aby sme ich dali agentovi)
            var availableSlots = await myTimeSlotService.GetAvailableSlotsAsync();

            // 2) OpenAI – vráti čistý JSON string (array appointments)
            var assistantJson = await CallOpenAiAsync(message, availableSlots, ct);

            // 3) uložíme výsledok do patientAgentResult.json
            var newAppointments = await myAppointmentService.SaveAgentResultAsync(assistantJson);

            return newAppointments;
        }

        private async Task<string> CallOpenAiAsync(AgentMessage message, IEnumerable<string> timeSlots, CancellationToken ct)
        {
            myHttpClient.DefaultRequestHeaders.Clear();
            myHttpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", myApiKey);

            var systemPrompt = @"
You are an appointment-booking AI assistant for the MediFlow healthcare system.
Your only job is to analyze the patient's message and extract the necessary data 
to create a general practitioner appointment request.

You must always return a valid JSON array with exactly one object inside it.
The JSON must use these exact fields and spelling:

- AppointmentId
- ClinicianName
- Specialization
- Issue
- AppointmentDate
- TimeSlot
- Address

Do not include any other information.
Do not include any explanation outside of the JSON.
Do not include code block formatting.

Valid response example:
[
  {
    ""AppointmentId"": ""1"",
    ""ClinicianName"": ""Mudr. Petra Svobodová"",
    ""Specialization"": ""General Medicine"",
    ""Issue"": ""Routine Check-up"",
    ""AppointmentDate"": ""2025-11-29"",
    ""TimeSlot"": ""08:00 - 08:30"",
    ""Address"": ""Trieda SNP 1, 040 11 Košice""
  }
]

Rules:
- AppointmentId is a string, you do NOT have to ensure uniqueness.
- Always use ClinicianName = ""Mudr. Petra Svobodová"" and Specialization = ""General Medicine"" unless told otherwise.
- Issue must be derived from the user's message. If not specified, use ""Unknown issue"".
- AppointmentDate should be today's date in format YYYY-MM-DD.
- TimeSlot must be chosen from the list of available time slots provided by the system.
  You can assume all of them are always available.
- Address is always ""Trieda SNP 1, 040 11 Košice"".
";

            var userContent = $@"
Patient message:
{message.prompt}

Available time slots:
{string.Join(", ", timeSlots)}
";

            var body = new
            {
                model = "gpt-5.1",
                messages = new[]
                {
                    new { role = "system", content = systemPrompt },
                    new { role = "user", content = userContent }
                }
            };

            var jsonBody = JsonSerializer.Serialize(body, myJsonOptions);
            using var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

            using var response = await myHttpClient.PostAsync(
                "https://api.openai.com/v1/chat/completions",
                content,
                ct);

            response.EnsureSuccessStatusCode();

            var respString = await response.Content.ReadAsStringAsync(ct);

            using var doc = JsonDocument.Parse(respString);
            var root = doc.RootElement;

            // očakávané: choices[0].message.content = JSON string
            var assistantContent = root
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            if (string.IsNullOrWhiteSpace(assistantContent))
            {
                throw new InvalidOperationException("Assistant returned empty content.");
            }

            return assistantContent;
        }
    }
}
