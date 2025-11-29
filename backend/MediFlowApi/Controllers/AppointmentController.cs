using Microsoft.AspNetCore.Mvc;
using MediFlowApi.Services;

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
        public IActionResult GetTimeSlots()
        {
            var slots = myTimeSlotService.GetAllTimeSlots();
            return Ok(slots);
        }

        [HttpGet("appointments")]
        public IActionResult getAppointments()
        {
            var appointments = myAppointmentService.GetAllAppointments();
            return Ok(appointments);
        }
    }
}