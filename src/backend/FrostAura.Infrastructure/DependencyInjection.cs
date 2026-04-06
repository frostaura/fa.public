using FrostAura.Application.Interfaces;
using FrostAura.Application.Services;
using FrostAura.Infrastructure.Configuration;
using FrostAura.Infrastructure.Persistence;
using FrostAura.Infrastructure.Repositories;
using FrostAura.Infrastructure.Services.Email;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FrostAura.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddFrostAuraInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<EmailSettings>(configuration.GetSection(EmailSettings.SectionName));
        services.AddDbContext<FrostAuraDbContext>(options =>
            options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<ICareerSubmissionRepository, CareerSubmissionRepository>();
        services.AddScoped<IInvestorSubmissionRepository, InvestorSubmissionRepository>();
        services.AddScoped<IEmailService, SmtpEmailService>();
        services.AddScoped<ISubmissionNotificationService, SubmissionNotificationService>();
        services.AddScoped<CareerSubmissionService>();
        services.AddScoped<InvestorSubmissionService>();

        return services;
    }
}
