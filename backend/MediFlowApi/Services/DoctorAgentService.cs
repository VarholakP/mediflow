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

            // Load valid values from local data
            var clinicians = LoadClinicians();
            var timeslots = LoadTimeSlots();
            var patientName = GetPatientNameById(message.patientId.ToString());

            // Prepare clinicians info for AI
            var cliniciansInfo = string.Join("; ", clinicians.Select(c => $"Name: {c.ClinicianName}, Specialization: {c.Specialization}, Address: {c.Address}"));
            var validSlots = string.Join(", ", timeslots.Where(t => t.available).Select(t => t.slot));

            var systemPrompt = $"Patient name: {patientName}. " +
                "Here is a list of clinicians with their names, specializations, and addresses: " + cliniciansInfo + ". " +
                "Based on the patient's message, determine the most suitable medical specialization. Then, select a doctor from the list of clinicians who matches that specialization. " +
                "Respond only in JSON with the following fields: patientName, doctorName, address, appointmentDate, reason. " +
                $"Set the patientName field to the patient's name: {patientName}. " +
                $"Valid appointmentDate values: {validSlots}. " +
                "Do not invent new doctors, addresses, dates, or patient names. Only use these values.";

            var requestBody = new
            {
                model = "gpt-5.1",
                messages = new[]
                {
                    new { role = "system", content = systemPrompt },
                    new { role = "user", content = message.message }
                }
            };

            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions",
                new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json"));

            var responseString = await response.Content.ReadAsStringAsync();
            dynamic result = JsonConvert.DeserializeObject(responseString);

            // Null checks and error handling
            if (result?.choices == null || result.choices.Count == 0 || result.choices[0]?.message?.content == null)
            {
                throw new Exception("AI response is missing or malformed: " + responseString);
            }

            return result.choices[0].message.content;
        }

        public async Task<Appointment> GetAppointmentFromAIAsync(PatientMessage message)
        {
            string filePath = Path.Combine("Data", "AppointmentDoctorToDoctor.json");
            string aiResponse = await AnalyzeMessageWithAIAsync(message);
            Console.WriteLine("AI Response: " + aiResponse);
            Appointment appointment = JsonConvert.DeserializeObject<Appointment>(aiResponse);

            var clinicians = LoadClinicians();
            var timeslots = LoadTimeSlots();

            if(!IsValidAppointment(appointment, clinicians, timeslots))
            {
                throw new Exception("The appointment details provided by the AI are invalid.");
            }

            File.WriteAllText(filePath, JsonConvert.SerializeObject(appointment, Formatting.Indented));
            return appointment; 
        }

        private List<Clinician> LoadClinicians()
        {
            var path = Path.Combine("Data", "Clinicians.json");
            var json = File.ReadAllText(path);
            return JsonConvert.DeserializeObject<List<Clinician>>(json);
        }

        private List<TimeSlot> LoadTimeSlots()
        {
            var path = Path.Combine("Data", "timeSlots.json");
            var json = File.ReadAllText(path);
            return JsonConvert.DeserializeObject<List<TimeSlot>>(json);
        }

        
            private List<Patient> LoadPatients()
            {
                var path = Path.Combine("Data", "patients.json");
                var json = File.ReadAllText(path);
                return JsonConvert.DeserializeObject<List<Patient>>(json);
            }

            private string GetPatientNameById(string patientId)
            {
                var patients = LoadPatients();
                var patient = patients.FirstOrDefault(p => p.id == patientId);
                return patient?.name ?? "Unknown Patient";
            }

        private bool IsValidAppointment(Appointment appointment, List<Clinician> clinicians, List<TimeSlot> timeslots)
        {
            var clinician = clinicians.FirstOrDefault(c => c.ClinicianName == appointment.doctorName && c.Address == appointment.address);
            var timeslot = timeslots.FirstOrDefault(t => t.slot == appointment.appointmentDate && t.available);

            return clinician != null && timeslot != null;
        }
    }
}