using MediFlowApi.Models;
using System.Text.Json;

namespace MediFlowApi.Services
{
    public class TimeSlotService
    {
        private readonly string timeSlotPath;
        private readonly JsonSerializerOptions myJsonOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            WriteIndented = true
        };

        public TimeSlotService(IWebHostEnvironment env)
        {
            timeSlotPath = Path.Combine(env.ContentRootPath, "Data", "timeSlots.json");
        }

        private async Task <List<TimeSlot>> LoadTimeSlotsAsync()
        {
            var json = File.ReadAllText(timeSlotPath);
            return JsonSerializer.Deserialize<List<TimeSlot>>(json, myJsonOptions)
                ?? new List<TimeSlot>();
        }

       public async Task<IEnumerable<string>> GetAvailableSlotsAsync()
        {
            var slots = await LoadTimeSlotsAsync();
            return slots
                .Where(x => x.available)
                .Select(x => x.slot)
                .ToList();
        }
    }
}