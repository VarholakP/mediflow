namespace MediFlowApi.Models
{
    public class Appointment
    {
        public string id { get; set; }
        public string doctorName { get; set; }
        public string address { get; set; }
        public string appointmentDate { get; set; }
        public string reason { get; set; }
    }
}