using FrostAura.Application.Contracts;
using FrostAura.Application.Interfaces;
using FrostAura.Domain.Entities;
using FrostAura.Infrastructure.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace FrostAura.Infrastructure.Services.Email;

public class SubmissionNotificationService : ISubmissionNotificationService
{
    private readonly IEmailService _emailService;
    private readonly EmailSettings _settings;
    private readonly ILogger<SubmissionNotificationService> _logger;

    public SubmissionNotificationService(
        IEmailService emailService,
        IOptions<EmailSettings> settings,
        ILogger<SubmissionNotificationService> logger)
    {
        _emailService = emailService;
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task<NotificationDeliveryResult> SendCareerSubmissionAsync(
        CareerSubmission submission,
        CancellationToken cancellationToken = default)
    {
        var supportDelivered = false;
        var autoResponseDelivered = false;

        if (_emailService.IsConfigured)
        {
            supportDelivered = await TrySendAsync(
                _settings.SupportEmail,
                $"New FrostAura careers submission from {submission.FullName}",
                BuildSupportNotificationHtml(
                    "Careers submission",
                    submission.FullName,
                    submission.Email,
                    new Dictionary<string, string>
                    {
                        ["Primary company interest"] = submission.PrimaryCompanyInterest,
                        ["Role track"] = submission.RoleTrack,
                        ["Availability"] = submission.AvailabilityWindow,
                        ["Location"] = submission.Location,
                        ["Recent role"] = submission.RecentRole,
                        ["Highest leverage contribution"] = submission.HighestLeverageContribution,
                        ["Proof of work"] = submission.ProofOfWork,
                    }),
                cancellationToken);

            autoResponseDelivered = await TrySendAsync(
                submission.Email,
                "We received your FrostAura careers submission",
                BuildAutoResponseHtml(
                    submission.FullName,
                    "Thank you for sharing your background with FrostAura. We have received your careers submission and will review it with the relevant company leads.",
                    "We designed this intake for high-signal candidates who can build, lead, and raise standards across difficult systems."),
                cancellationToken);
        }

        return new NotificationDeliveryResult(autoResponseDelivered, supportDelivered);
    }

    public async Task<NotificationDeliveryResult> SendInvestorSubmissionAsync(
        InvestorSubmission submission,
        CancellationToken cancellationToken = default)
    {
        var supportDelivered = false;
        var autoResponseDelivered = false;

        if (_emailService.IsConfigured)
        {
            supportDelivered = await TrySendAsync(
                _settings.SupportEmail,
                $"New FrostAura investor submission from {submission.Organization}",
                BuildSupportNotificationHtml(
                    "Investor submission",
                    submission.FullName,
                    submission.Email,
                    new Dictionary<string, string>
                    {
                        ["Organization"] = submission.Organization,
                        ["Investor type"] = submission.InvestorType,
                        ["Region"] = submission.Region,
                        ["Company interest"] = submission.CompanyInterest,
                        ["Interest profile"] = submission.InterestProfile,
                        ["Capital range"] = submission.CapitalRange,
                        ["Thesis"] = submission.Thesis,
                        ["Value add"] = submission.ValueAdd,
                    }),
                cancellationToken);

            autoResponseDelivered = await TrySendAsync(
                submission.Email,
                "We received your FrostAura investor submission",
                BuildAutoResponseHtml(
                    submission.FullName,
                    "Thank you for your interest in FrostAura. We have received your submission and will review it internally before following up.",
                    "This intake is for aligned long-horizon conversations only and does not constitute an offer to sell securities."),
                cancellationToken);
        }

        return new NotificationDeliveryResult(autoResponseDelivered, supportDelivered);
    }

    private async Task<bool> TrySendAsync(
        string toEmail,
        string subject,
        string htmlBody,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(toEmail))
        {
            _logger.LogWarning("Skipping outbound email because the destination address is blank.");
            return false;
        }

        return await _emailService.SendEmailAsync(toEmail, subject, htmlBody, cancellationToken);
    }

    private string BuildAutoResponseHtml(string firstName, string body, string note)
    {
        return $"""
            <!DOCTYPE html>
            <html lang="en">
            <body style="margin:0;padding:0;background:#f6f8fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1f2937;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:24px;padding:32px;box-shadow:0 20px 60px rgba(17,24,39,0.08);">
                      <tr>
                        <td>
                          <p style="margin:0 0 12px;color:{_settings.BrandPrimaryColor};font-weight:700;letter-spacing:.08em;text-transform:uppercase;">{_settings.BrandName}</p>
                          <h1 style="margin:0 0 16px;font-size:30px;line-height:1.05;">Hello {System.Net.WebUtility.HtmlEncode(firstName)}.</h1>
                          <p style="margin:0 0 16px;line-height:1.7;color:#475569;">{System.Net.WebUtility.HtmlEncode(body)}</p>
                          <p style="margin:0 0 24px;line-height:1.7;color:#475569;">{System.Net.WebUtility.HtmlEncode(note)}</p>
                          <a href="{_settings.PublicAppUrl}" style="display:inline-block;padding:14px 20px;border-radius:14px;background:{_settings.BrandPrimaryColor};color:#fff;text-decoration:none;font-weight:700;">Visit FrostAura</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """;
    }

    private string BuildSupportNotificationHtml(
        string title,
        string fullName,
        string email,
        IReadOnlyDictionary<string, string> values)
    {
        var rows = string.Join(
            "",
            values.Select(pair =>
                $"""
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;">
                        <strong style="display:block;color:#0f172a;">{System.Net.WebUtility.HtmlEncode(pair.Key)}</strong>
                        <span style="color:#475569;line-height:1.6;">{System.Net.WebUtility.HtmlEncode(pair.Value)}</span>
                      </td>
                    </tr>
                """));

        return $"""
            <!DOCTYPE html>
            <html lang="en">
            <body style="margin:0;padding:0;background:#f6f8fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1f2937;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="100%" style="max-width:680px;background:#ffffff;border-radius:24px;padding:32px;box-shadow:0 20px 60px rgba(17,24,39,0.08);">
                      <tr>
                        <td>
                          <p style="margin:0 0 12px;color:{_settings.BrandAlertColor};font-weight:700;letter-spacing:.08em;text-transform:uppercase;">{title}</p>
                          <h1 style="margin:0 0 12px;font-size:30px;line-height:1.05;">{System.Net.WebUtility.HtmlEncode(fullName)}</h1>
                          <p style="margin:0 0 24px;line-height:1.7;color:#475569;">Reply-to: {System.Net.WebUtility.HtmlEncode(email)}</p>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            {rows}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """;
    }
}
