using Infrastructure.DI;
using WebApi.Config;
using WebApi.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers()
    .AddJsonOptions(o =>
        o.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase);

builder.Services.AddSwaggerWithJwt();
builder.Services.AddPersistence(builder.Configuration);
builder.Services.AddIdentityAndJwt(builder.Configuration);
builder.Services.AddInfrastructure(builder.Configuration);   // <- AQUI!
builder.Services.AddTransient<ExceptionHandlingMiddleware>();

builder.Services.AddCors(o => o.AddPolicy("dev",
    p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// Pipeline
app.UseCors("dev");
app.UseSwagger();
app.UseSwaggerUI();

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
