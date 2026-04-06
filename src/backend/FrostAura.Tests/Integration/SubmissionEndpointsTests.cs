using System.Net;
using System.Net.Http.Json;
using FrostAura.Application.Contracts;
using FrostAura.Application.Interfaces;
using FrostAura.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace FrostAura.Tests.Integration;

public class SubmissionEndpointsTests
{
    [Fact]
    public async Task CareersEndpoint_PersistsSubmissionAndReturnsReceipt()
    {
        await using var factory = new TestApplicationFactory();
        using var client = factory.CreateClient();

        var response = await client.PostAsJsonAsync(
            "/api/careers/submissions",
            new CareerSubmissionRequest
            {
                PrimaryCompanyInterest = "FrostAura Technologies",
                RoleTrack = "Principal Software and Platform Engineering",
                AvailabilityWindow = "Immediately",
                Location = "Cape Town, South Africa",
                AdjacentCompanyInterest = ["Ventures"],
                FullName = "Jane Doe",
                Email = "jane@example.com",
                RecentRole = "Principal Engineer",
                HighestLeverageContribution = "Build the platform backbone.",
                ProofOfWork = "Led a distributed systems migration.",
            });

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var receipt = await response.Content.ReadFromJsonAsync<SubmissionReceipt>();
        Assert.NotNull(receipt);

        using var scope = factory.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<FrostAuraDbContext>();
        Assert.Single(dbContext.CareerSubmissions);
    }

    [Fact]
    public async Task InvestorsEndpoint_PersistsSubmissionAndReturnsReceipt()
    {
        await using var factory = new TestApplicationFactory();
        using var client = factory.CreateClient();

        var response = await client.PostAsJsonAsync(
            "/api/investors/submissions",
            new InvestorSubmissionRequest
            {
                FullName = "Alex Investor",
                Organization = "North Star Capital",
                Email = "alex@example.com",
                InvestorType = "Family office",
                Region = "Global",
                CompanyInterest = ["Technologies", "Ventures"],
                InterestProfile = "Operating company growth",
                CapitalRange = "1M - 5M USD equivalent",
                TimeHorizon = "Within 12 months",
                PreferredMode = "Capital and strategic support",
                Thesis = "The architecture compounds capability.",
                ValueAdd = "Operator network and long-horizon capital.",
            });

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var receipt = await response.Content.ReadFromJsonAsync<SubmissionReceipt>();
        Assert.NotNull(receipt);

        using var scope = factory.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<FrostAuraDbContext>();
        Assert.Single(dbContext.InvestorSubmissions);
    }

    private sealed class TestApplicationFactory : WebApplicationFactory<Program>, IAsyncDisposable
    {
        private readonly string _databasePath = Path.Combine(Path.GetTempPath(), $"{Guid.NewGuid():N}.db");

        protected override void ConfigureWebHost(Microsoft.AspNetCore.Hosting.IWebHostBuilder builder)
        {
            builder.ConfigureAppConfiguration(
                (_, configuration) =>
                {
                    configuration.AddInMemoryCollection(
                        new Dictionary<string, string?>
                        {
                            ["ConnectionStrings:DefaultConnection"] = $"Data Source={_databasePath}",
                            ["FrostAura:AllowedOrigins:0"] = "http://localhost:5173",
                        });
                });

            builder.ConfigureServices(
                services =>
                {
                    services.RemoveAll<ISubmissionNotificationService>();
                    services.AddSingleton<ISubmissionNotificationService, FakeSubmissionNotificationService>();

                    using var scope = services.BuildServiceProvider().CreateScope();
                    var dbContext = scope.ServiceProvider.GetRequiredService<FrostAuraDbContext>();
                    dbContext.Database.EnsureCreated();
                });
        }

        public new async ValueTask DisposeAsync()
        {
            await Task.CompletedTask;

            if (File.Exists(_databasePath))
            {
                File.Delete(_databasePath);
            }
        }
    }

    private sealed class FakeSubmissionNotificationService : ISubmissionNotificationService
    {
        public Task<NotificationDeliveryResult> SendCareerSubmissionAsync(
            FrostAura.Domain.Entities.CareerSubmission submission,
            CancellationToken cancellationToken = default) =>
            Task.FromResult(new NotificationDeliveryResult(true, true));

        public Task<NotificationDeliveryResult> SendInvestorSubmissionAsync(
            FrostAura.Domain.Entities.InvestorSubmission submission,
            CancellationToken cancellationToken = default) =>
            Task.FromResult(new NotificationDeliveryResult(true, true));
    }
}
