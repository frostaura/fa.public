namespace FrostAura.Domain.Entities;

public class InvestorSubmission
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime ReceivedAtUtc { get; set; } = DateTime.UtcNow;
    public string SubmissionStatus { get; set; } = "Received";
    public bool AutoResponseDelivered { get; set; }
    public bool SupportNotificationDelivered { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Organization { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string InvestorType { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string CompanyInterest { get; set; } = string.Empty;
    public string InterestProfile { get; set; } = string.Empty;
    public string CapitalRange { get; set; } = string.Empty;
    public string TimeHorizon { get; set; } = string.Empty;
    public string PreferredMode { get; set; } = string.Empty;
    public string Thesis { get; set; } = string.Empty;
    public string ValueAdd { get; set; } = string.Empty;
    public string ExtraNote { get; set; } = string.Empty;
    public string SubmittedAt { get; set; } = string.Empty;
    public string SubmittedFrom { get; set; } = string.Empty;
    public string Host { get; set; } = string.Empty;
}
