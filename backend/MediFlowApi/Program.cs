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
var app = builder.Build();

// 3) Middleware
app.UseHttpsRedirection();
app.UseCors(CorsName);
app.UseAuthorization();

app.MapControllers();

app.Run();