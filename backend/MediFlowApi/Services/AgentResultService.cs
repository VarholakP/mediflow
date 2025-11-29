using System.Text;
using MediFlowApi.Models;
using Newtonsoft.Json;

namespace MediFlowApi.Services
{
    public class AgentResultService
    {
        private readonly HttpClient _httpClient;
        private readonly string _openAiApiKey;

        public AgentResultService(HttpClient client, IConfiguration config)
        {
            _httpClient = client;
            _openAiApiKey = config["OpenAI:ApiKey"]
                ?? throw new InvalidOperationException("Missing OpenAI API key");
        }

        private async Task<string> CatchPromptAsync(AgentMessage message, IEnumerable<string> availableTimeSlots)
        {
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_openAiApiKey}");

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
                        ""Address"": ""Trieda SNP 1, 040 13 Košice""
                    }
                ]

                Rules:
                    - AppointmentId is always a string, you do NOT have to ensure uniqueness.
                    - Always use ClinicianName = ""Mudr. Petra Svobodová"" and Specialization = ""General Medicine"" unless told otherwise.
                    - Issue must be derived from the user's message. If not specified, use ""Unknown issue"".
                    - AppointmentDate should be today's date in format YYYY-MM-DD.
                    - TimeSlot must be chosen from the list of available time slots provided by the system.
                    - Address is always ""Trieda SNP 1, 040 13 Košice"". 
                    ";

            var userContent = $@"
                Patient message:
                    {message.prompt}

                Available time slots:
                    {string.Join(", ", availableTimeSlots)}
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

            var jsonBody = JsonConvert.SerializeObject(body);
            var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(
                "https://api.openai.com/v1/chat/completions",
                content
            );

            response.EnsureSuccessStatusCode();

            var respString = await response.Content.ReadAsStringAsync();
            dynamic result = JsonConvert.DeserializeObject(respString);

            // toto je čistý JSON string, ktorý agent vrátil (tvoj appointment array)
            string assistantJson = result.choices[0].message.content;
            return assistantJson;
        }
    }
}
