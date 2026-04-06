namespace FrostAura.Domain.Entities;

public class CareerSubmission
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime ReceivedAtUtc { get; set; } = DateTime.UtcNow;
    public string SubmissionStatus { get; set; } = "Received";
    public bool AutoResponseDelivered { get; set; }
    public bool SupportNotificationDelivered { get; set; }
    public string PrimaryCompanyInterest { get; set; } = string.Empty;
    public string RoleTrack { get; set; } = string.Empty;
    public string AvailabilityWindow { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string AdjacentCompanyInterest { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Website { get; set; } = string.Empty;
    public string Portfolio { get; set; } = string.Empty;
    public string RecentRole { get; set; } = string.Empty;
    public string ResumeLink { get; set; } = string.Empty;
    public string HighestLeverageContribution { get; set; } = string.Empty;
    public string ProofOfWork { get; set; } = string.Empty;
    public string ExtraNote { get; set; } = string.Empty;
    public string SubmittedAt { get; set; } = string.Empty;
    public string SubmittedFrom { get; set; } = string.Empty;
    public string Host { get; set; } = string.Empty;
}
