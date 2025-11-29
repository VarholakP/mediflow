using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MediFlowApi.Services;

namespace MediFlowApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly TimeSlotService myTimeSlotService;

        public AppointmentController(TimeSlotService timeSlotService)
        {
            myTimeSlotService = timeSlotService;
        }

        [HttpGet("available-timeslots")]
        public IActionResult GetTimeSlots()
        {
            var slots = myTimeSlotService.GetAllTimeSlots();
            return Ok(slots);
        }
    }
}