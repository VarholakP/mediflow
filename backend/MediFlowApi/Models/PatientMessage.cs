namespace MediFlowApi.Models
{
    public class PatientMessage
    {
        public int patientId {get; set;}
        public string patientName {get; set;} = string.Empty;
        public string clinicianName {get; set;} = string.Empty;
        public string issue {get; set;} = string.Empty;
    }
}