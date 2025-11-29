using Microsoft.AspNetCore.Mvc;
using MediFlowApi.Models;
using MediFlowApi.Services;
using System.Threading.Tasks;

namespace MediFlowApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorAgentController : ControllerBase
    {
        private readonly DoctorAgentService _doctorAgentService;

        public DoctorAgentController(DoctorAgentService doctorAgentService)
        {
            _doctorAgentService = doctorAgentService;
        }

        [HttpPost("GetAppointment")]
        public async Task<ActionResult<Appointment>> AnalyzeMessage([FromBody] PatientMessage message)
        {
            var appointment = await _doctorAgentService.GetAppointmentFromAIAsync(message);
            return Ok(appointment);
        }
    }
}