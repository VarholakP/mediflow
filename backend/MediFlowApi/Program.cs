using MediFlowApi.Services;

using MediFlowApi.Services;
using MediFlowApi.Services;

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

// 2) Build
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();

// Register DoctorAgentService with HttpClient and API key from configuration
var openAiApiKey = builder.Configuration["OpenAI:ApiKey"] ?? "YOUR_OPENAI_API_KEY";
builder.Services.AddHttpClient<DoctorAgentService>()
    .AddTypedClient((httpClient, sp) =>
        new DoctorAgentService(httpClient, openAiApiKey));

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

// 2) Build
var app = builder.Build();

// 3) Middleware
// app.UseHttpsRedirection();
app.UseCors(CorsName);
app.UseAuthorization();

app.MapControllers();

app.MapControllers();
// 3) Middleware
app.UseHttpsRedirection();
app.UseCors(CorsName);
app.UseAuthorization();

app.MapControllers();

app.Run();