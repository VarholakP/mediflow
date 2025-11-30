using Microsoft.AspNetCore.Mvc;
using MediFlowApi.Services;
using System.Threading.Tasks;

namespace MediFlowApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly TimeSlotService myTimeSlotService;
        private readonly AppointmentService myAppointmentService;

        public AppointmentController(TimeSlotService timeSlotService, AppointmentService appService)
        {
            myTimeSlotService = timeSlotService;
            myAppointmentService = appService;
        }

        [HttpGet("available-timeslots")]
        public async Task<IActionResult> GetTimeSlots()
        {
            var slots = myTimeSlotService.GetAvailableSlotsAsync();
            return Ok(slots);
        }

        [HttpGet("appointments")]
        public async Task<IActionResult> getAppointments()
        {
            var appointments = await myAppointmentService.GetAllAppointmentsAsync();
            return Ok(appointments);
        }
    }
}