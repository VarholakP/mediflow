using MediFlowApi.Models;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace MediFlowApi.Services
{
    public class DoctorAgentService
    {
        private readonly HttpClient _httpClient;
        private readonly string _openAiApiKey;

        public DoctorAgentService(HttpClient httpClient, string openAiApiKey)
        {
            _httpClient = httpClient;
            _openAiApiKey = openAiApiKey;
        }

        private async Task<string> AnalyzeMessageWithAIAsync(PatientMessage message)
        {
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_openAiApiKey}");

            var requestBody = new
            {
                model = "gpt-5.1",
                messages = new[]
                {
                    new { role = "system", content = "Respond only in JSON with the following fields: id, doctorName, address, appointmentDate, reason."},
                    new { role = "user", content = message.message }
                }
            };

            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions",
                new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json"));

            var responseString = await response.Content.ReadAsStringAsync();
            dynamic result = JsonConvert.DeserializeObject(responseString);
            return result.choices[0].message.content;
        }

        public async Task<Appointment> GetAppointmentFromAIAsync(PatientMessage message)
        {
            string aiResponse = await AnalyzeMessageWithAIAsync(message);
            Appointment appointment = JsonConvert.DeserializeObject<Appointment>(aiResponse);
            return appointment; 
        }

        private List<Clinician> LoadClinicians()
        {
            var path = path.combine("Data", "clinicians.json");
            var json = File.ReadAllText(path);
            return JsonConvert.DeserializeObject<List<Clinician>>(json);
        }

        private List<TimeSlot> LoadTimeSlots()
        {
            var path = path.combine("Data", "timeslots.json");
            var json = File.ReadAllText(path);
            return JsonConvert.DeserializeObject<List<TimeSlot>>(json);
        }

        private bool IsValidAppointment(Appointment appointment, List)
    }}