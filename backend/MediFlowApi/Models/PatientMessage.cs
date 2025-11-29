namespace MediFlowApi.Models
{
    public class PatientMessage
    {
        public int id {get; set;}
        public int patientId {get; set;}
        public string patientName {get; set;}
        public string doctorName {get; set;}
        public string message {get; set;}
    }
}