using API.Data;
using API.Extensions;
using API.Middleware;
using Microsoft.AspNetCore.Components.Forms;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
} else {
    app.UseHttpsRedirection();
}
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors("client");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try {
    var context = services.GetRequiredService<DataContextEF>();
} catch (Exception ex) {
    var logger = services.GetService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred Entity Framework setup.");
}

app.Run();
