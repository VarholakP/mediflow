using Microsoft.AspNetCore.Mvc;
using MediFlowApi.Models;
using MediFlowApi.Services;
using System.Buffers;

namespace MediFlowApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientAgentController : ControllerBase
    {
        private readonly AppointmentService myAppService;
        private readonly AgentResultService myAgentService;

        public PatientAgentController(AppointmentService service, AgentResultService agentService)
        {
            myAppService = service;
            myAgentService = agentService;
        }

        [HttpPost("save")]
        public async Task<IActionResult> Save([FromBody] object body)
        {
            var json = body.ToString() ?? "[]";

            var saved = await myAppService.SaveAgentResultAsync(json);
            return Ok(saved);
        }

        [HttpPost("process")]
        public async Task<IActionResult> Process([FromBody] AgentMessage message, CancellationToken cancelToken)
        {
            if (message == null || string.IsNullOrWhiteSpace(message.prompt))
            {
                return BadRequest( new
                {
                    message = "Prompt is missing."
                });
            }

            var appointments = await myAgentService.ProcessPatientMessageAsync(message, cancelToken);
            if (!appointments.Any())
            {
                return BadRequest(new
                {
                    message = "Agent did not return any appointment."
                });
            }

            return Ok(new
            {
                message = "Appointment created.",
                result = appointments
            });
        }
    }
}