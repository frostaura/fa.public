using FrostAura.Infrastructure;
using FrostAura.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddInMemoryCollection(
    new Dictionary<string, string?>
    {
        ["FrostAura:Email:Server"] = Environment.GetEnvironmentVariable("EMAIL_SERVER"),
        ["FrostAura:Email:Port"] = Environment.GetEnvironmentVariable("EMAIL_PORT"),
        ["FrostAura:Email:Account"] = Environment.GetEnvironmentVariable("EMAIL_ACCOUNT"),
        ["FrostAura:Email:Password"] = Environment.GetEnvironmentVariable("EMAIL_PASSWORD"),
        ["FrostAura:Email:SenderEmail"] = Environment.GetEnvironmentVariable("EMAIL_SENDER_EMAIL"),
        ["FrostAura:Email:SenderName"] = Environment.GetEnvironmentVariable("EMAIL_SENDER_NAME"),
        ["FrostAura:Email:EnableSsl"] = Environment.GetEnvironmentVariable("EMAIL_ENABLE_SSL"),
        ["FrostAura:Email:SupportEmail"] = Environment.GetEnvironmentVariable("EMAIL_SUPPORT_EMAIL"),
        ["FrostAura:Email:TimeoutSeconds"] = Environment.GetEnvironmentVariable("EMAIL_TIMEOUT_SECONDS"),
        ["FrostAura:Email:PublicAppUrl"] = Environment.GetEnvironmentVariable("APP_URL"),
        ["FrostAura:Email:BrandName"] = Environment.GetEnvironmentVariable("EMAIL_BRAND_NAME"),
        ["FrostAura:Email:BrandOwner"] = Environment.GetEnvironmentVariable("EMAIL_BRAND_OWNER"),
        ["FrostAura:Email:BrandPrimaryColor"] = Environment.GetEnvironmentVariable("EMAIL_BRAND_PRIMARY_COLOR"),
        ["FrostAura:Email:BrandAlertColor"] = Environment.GetEnvironmentVariable("EMAIL_BRAND_ALERT_COLOR"),
    }.Where(pair => !string.IsNullOrWhiteSpace(pair.Value))
);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "frontend",
        policy =>
        {
            var origins = builder.Configuration
                .GetSection("FrostAura:AllowedOrigins")
                .Get<string[]>() ?? ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:4173", "http://127.0.0.1:4173"];

            policy.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod();
        });
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddFrostAuraInfrastructure(builder.Configuration);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<FrostAuraDbContext>();
    await dbContext.Database.EnsureCreatedAsync();
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("frontend");
app.UseAuthorization();
app.MapControllers();
app.MapGet("/", () => Results.Redirect("/health"));

app.Run();

public partial class Program;
