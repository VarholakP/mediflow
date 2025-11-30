namespace MediFlow.Models
{
    public class AgentResult
    {
        public string PatientId { get; set; } = string.Empty;
        public string PatientName { get; set; } = string.Empty;
        public string ClinicianName { get; set;}  = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public string Issue { get; set; } = string.Empty;
        public string AppointmentDate { get; set; } = string.Empty;
        public string TimeSlot { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }
}