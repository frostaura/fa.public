using System.ComponentModel.DataAnnotations;

namespace FrostAura.Application.Contracts;

public class CareerSubmissionRequest
{
    [Required]
    public string PrimaryCompanyInterest { get; set; } = string.Empty;

    [Required]
    public string RoleTrack { get; set; } = string.Empty;

    [Required]
    public string AvailabilityWindow { get; set; } = string.Empty;

    [Required]
    public string Location { get; set; } = string.Empty;

    public IReadOnlyList<string> AdjacentCompanyInterest { get; set; } = [];

    [Required]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    public string? Website { get; set; }

    public string? Portfolio { get; set; }

    [Required]
    public string RecentRole { get; set; } = string.Empty;

    public string? ResumeLink { get; set; }

    [Required]
    public string HighestLeverageContribution { get; set; } = string.Empty;

    [Required]
    public string ProofOfWork { get; set; } = string.Empty;

    public string? ExtraNote { get; set; }
    public string? SubmittedAt { get; set; }
    public string? SubmittedFrom { get; set; }
    public string? Host { get; set; }
}
