using System.Text.Json;
using MediFlow.Models;
using MediFlowApi.Models;

namespace MediFlowApi.Services
{
    public class AppointmentService
    {
        private readonly string appointmentPath;
        private readonly string patientsPath;
        private readonly JsonSerializerOptions myJsonOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            WriteIndented = true
        };

        public AppointmentService(IWebHostEnvironment env)
        {
            appointmentPath = Path.Combine(env.ContentRootPath, "Data", "patientAgentResult.json");
            patientsPath = Path.Combine(env.ContentRootPath, "Data", "patients.json");
        }

        private async Task<List<Patient>> LoadPatientAsync()
        {
            var json = File.ReadAllText(patientsPath);
            return JsonSerializer.Deserialize<List<Patient>>(json, myJsonOptions)
                ?? new List<Patient>();

        }

        private async Task<List<AgentResult>> loadAppointmentsAsync()
        {
            var json = File.ReadAllText(appointmentPath);
            return JsonSerializer.Deserialize<List<AgentResult>>(json, myJsonOptions)
                ?? new List<AgentResult>();
        }

        private async Task SaveAppointmentsAsync(List<AgentResult> appointments)
        {
            var json = JsonSerializer.Serialize(appointments, myJsonOptions);
            await File.WriteAllTextAsync(appointmentPath, json);
        }

        public async Task<List<AgentResult>> SaveAgentResultAsync(string tempJson)
        {
            var newAppointments = JsonSerializer.Deserialize<List<AgentResult>>(tempJson,  myJsonOptions)
                            ?? new List<AgentResult>();

            var existing = await loadAppointmentsAsync();
            int nextId = existing.Any()
                ? existing.Max(x => int.Parse(x.PatientId)) + 1
                : 1;
            
            if (nextId > 5)
            {
                nextId = 1;
            }

            var patients = await LoadPatientAsync();
            foreach (var item in newAppointments)
            {
                item.PatientId = nextId.ToString();

                var patient = patients.FirstOrDefault(p => p.id.ToString() == item.PatientId);
                item.PatientName = patient?.name ?? "Unknown patient";
                nextId++;

                if (nextId > 5)
                {
                    nextId = 1;
                }
            }
            existing.AddRange(newAppointments);

            await SaveAppointmentsAsync(existing);

            return newAppointments;
        }

        public async Task<IEnumerable<AgentResult>> GetAllAppointmentsAsync()
        {
            return await loadAppointmentsAsync();
        }
    }
}