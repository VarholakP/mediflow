namespace MediFlowApi.Models
{
    public class PatientMessage
    {
        public int id {get; set;}
        public int patientId {get; set;}
        public string patientName {get; set;} = string.Empty;
        public string doctorName {get; set;} = string.Empty;
        public string message {get; set;} = string.Empty;
    }
}