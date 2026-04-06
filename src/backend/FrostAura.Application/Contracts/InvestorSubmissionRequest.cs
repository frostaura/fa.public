using System.ComponentModel.DataAnnotations;

namespace FrostAura.Application.Contracts;

public class InvestorSubmissionRequest
{
    [Required]
    public string FullName { get; set; } = string.Empty;

    [Required]
    public string Organization { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string InvestorType { get; set; } = string.Empty;

    [Required]
    public string Region { get; set; } = string.Empty;

    [MinLength(1)]
    public IReadOnlyList<string> CompanyInterest { get; set; } = [];

    [Required]
    public string InterestProfile { get; set; } = string.Empty;

    [Required]
    public string CapitalRange { get; set; } = string.Empty;

    [Required]
    public string TimeHorizon { get; set; } = string.Empty;

    [Required]
    public string PreferredMode { get; set; } = string.Empty;

    [Required]
    public string Thesis { get; set; } = string.Empty;

    [Required]
    public string ValueAdd { get; set; } = string.Empty;

    public string? ExtraNote { get; set; }
    public string? SubmittedAt { get; set; }
    public string? SubmittedFrom { get; set; }
    public string? Host { get; set; }
}
