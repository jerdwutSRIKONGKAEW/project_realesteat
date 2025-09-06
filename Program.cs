using Microsoft.EntityFrameworkCore;
using serviceApiRealestate.Api;
using serviceApiRealestate.Repositories;
using serviceApiRealestate.Services;
using System;

var builder = WebApplication.CreateBuilder(args);

// 1. อ่าน connection string template
var connectionTemplate = builder.Configuration.GetConnectionString("DefaultConnectionTemplate");

// 2. อ่านค่าจาก Environment Variables
var username = Environment.GetEnvironmentVariable("DB_USERNAME");
var password = Environment.GetEnvironmentVariable("DB_PASSWORD");

// 3. ประกอบ connection string จริง
var finalConnectionString = $"{connectionTemplate};Username={username};Password={password}";

// 4. Add Services ก่อน builder.Build()
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(finalConnectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJS", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddScoped<IAboutService, AboutService>();
builder.Services.AddScoped<IAboutRepository, AboutRepository>();

builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();

builder.Services.AddScoped<IAssetService, AssetService>();
builder.Services.AddScoped<IAssetRepository, AssetRepository>();

builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IMenuRepository, MenuRepository>();

builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();
// 5. Build แอป
var app = builder.Build();

// 6. Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// ⭐ ใช้ CORS ก่อน UseHttpsRedirection
app.UseCors("AllowNextJS");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
