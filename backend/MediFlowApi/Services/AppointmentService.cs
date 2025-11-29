using System.Text.Json;
using MediFlow.Models;
using MediFlowApi.Models;

namespace MediFlowApi.Services
{
    public class AppointmentService
    {
        private readonly string appointmentPath;

        public AppointmentService(IWebHostEnvironment env)
        {
            appointmentPath = Path.Combine(env.ContentRootPath, "Data", "patientAgentResult.json");
        }

        private List<AgentResult> loadAppointments()
        {
            var json = File.ReadAllText(appointmentPath);
            return JsonSerializer.Deserialize<List<AgentResult>>(json) ?? new List<AgentResult>();
        }

        public IEnumerable<AgentResult> GetAllAppointments()
        {
            return loadAppointments()
                .Where(x => x.AppointmentId != null);
        }
    }
}