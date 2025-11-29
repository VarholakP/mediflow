using System.Security.Cryptography.X509Certificates;
using MediFlowApi.Models;
using Newtonsoft.Json;

namespace MediFlowApi.Services
{
    public class AgentResultService
    {
        private readonly HttpClient myHttpClient;
        private readonly string myOpenAiApiKey;

        public AgentResultService(HttpClient client, string ApiKey)
        {
            myHttpClient = client;
            myOpenAiApiKey = ApiKey;
        }

        private async Task<string> CatchPrompt(AgentMessage message)
        {
            myHttpClient.DefaultRequestHeaders.Clear();
            myHttpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer{myOpenAiApiKey}");

            var body = new
            {
                model = "gpt-5.1",
                message = new[]
                {
                    new { role = "system", 
                        content = @"You are an appointment-booking AI assistant for the MediFlow healthcare system.
                                    Your only job is to analyze the patient's message and extract the neccessary data to create a general practitioner appointment request.
                                    
                                    You must always return valid JSON array with exactly one object indside it.
                                    The JSON must use these exact fields and spelling:
                                    
                                    - AppointmentId
                                    - ClinicianName
                                    - Specialization
                                    - Issue
                                    - AppointmentDate
                                    - TimeSlot
                                    - Address
                                    
                                    - Do not include any other informations.
                                    - Do not include any explanation outside of the JSON.
                                    - Do not include code block formatting.
                                    
                                    Valid response example:
                                    [
                                        {
                                            ""AppointmentId"": ""1"",
                                            ""ClinicianName"": ""Mudr. Petra Svobodová"",
                                            ""Specialization"": ""General Medicine"",
                                            ""Issue"": ""Routine Check-up"",
                                            ""AppointmentDate"": ""2025-11-29"",
                                            ""TimeSlot"": ""08:00 - 08:30"",
                                            ""Address"": ""Trieda SNP 1, 040 13 Košice"" 
                                        }
                                    ]
                                    
                                    Rules:
                                        - AppointmentId is always auto increment.
                                        - Always fill ClinicianName and Specialization from file Data/Clinician.json where ClinicianName is Mudr. Petra Svobodová and Specialization is General Medicine
                                        - Issue has to be pulled from message if there is not specified issue fill with unknown issue.
                                        - For AppointmentDate always fill todays date.
                                        - For TimeSlot look into Data/timeSlots.json if there is slot which has available set to true u can choose this.
                                        - Address always pull from Data/Clinicians.json where Address is specified, always pull addres for General Medicine specialization.
                                        
                                    At the end create appointment and save that response you created into Data/patientAgentResult.json and
                                    in Data/timeSlot.json change available to false when you booked specific slot."
                        },
                        new { role = "user", content = message.prompt}
                }
            };

            var response = await myHttpClient.PostAsync("https://api.openai.com/v1/chat/completions",
                new StringContent(JsonConvert.SerializeObject(body)));

            var respString = await response.Content.ReadAsStringAsync();
            dynamic result = JsonConvert.DeserializeObject(respString);
            return result.choices[0].message.content;
        }
    }
}