using MediFLowApi.Models;
using System.Text.Json;


namespace MediFlowApi.Services
{
    public class TimeSlotService
    {
        private readonly string timeSlotPath;

        public TimeSlotService(IWebHostEnvironment env)
        {
            timeSlotPath = Path.Combine(env.ContentRootPath, "Data", "timeSlots.json");
        }

        private List<TimeSlot> LoadTimeSlots()
        {
            var json = File.ReadAllText(timeSlotPath);
            return JsonSerializer.Deserialize<List<TimeSlot>>(json) ?? new List<TimeSlot>();
        }

        public IEnumerable<string> GetAllTimeSlots()
        {
            return LoadTimeSlots()
            .Where(x => x.available == true)
            .Select(x =>  x.slot);
        }
    }
}