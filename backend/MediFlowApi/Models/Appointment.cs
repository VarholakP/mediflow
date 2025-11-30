namespace MediFlowApi.Models
{
    public class Appointment
    {
        public string patientName { get; set; } = string.Empty;
        public string doctorName { get; set; } = string.Empty;
        public string specialization { get; set; } = string.Empty;
        public string address { get; set; } = string.Empty;
        public string appointmentDate { get; set; } = string.Empty;
        public string reason { get; set; } = string.Empty;

        public string TimeSlot { get; set; } = string.Empty;
    }
}