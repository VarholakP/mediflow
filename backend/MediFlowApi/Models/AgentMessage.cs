using Microsoft.AspNetCore.SignalR;

namespace MediFlowApi.Models
{
    public class AgentMessage
    {
        public string prompt  { get; set; } = string.Empty;
    }
}