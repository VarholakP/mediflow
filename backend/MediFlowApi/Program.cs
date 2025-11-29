using MediFlowApi.Services;
using DotNetEnv;

// Load environment variables from .env in the parent backend directory
Env.Load("../.env");
var builder = WebApplication.CreateBuilder(args);

// 1) Services
builder.Services.AddControllers();
builder.Services.AddAuthorization();

var CorsName = "AllowFrontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CorsName, policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<TimeSlotService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register DoctorAgentService with HttpClient and API key from configuration
var openAiApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY") ?? "YOUR_OPENAI_API_KEY";
builder.Services.AddHttpClient<DoctorAgentService>()
    .AddTypedClient((httpClient, sp) =>
        new DoctorAgentService(httpClient, openAiApiKey));

// 2) Build
var app = builder.Build();

Console.WriteLine("Loaded OpenAI API Key: " + openAiApiKey);

// 3) Middleware
// app.UseHttpsRedirection();
app.UseCors(CorsName);
app.UseAuthorization();

// Enable middleware to serve generated Swagger as a JSON endpoint and the Swagger UI
app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();
app.Run();