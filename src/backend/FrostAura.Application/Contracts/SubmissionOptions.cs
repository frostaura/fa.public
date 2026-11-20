using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace FrostAura.Application.Contracts;

/// <summary>
/// The option sets the public forms offer, mirrored from <c>src/web/src/content/siteContent.ts</c>.
/// Only FrostAura's active divisions are accepted; keep both files in step.
/// </summary>
public static class SubmissionOptions
{
    public static readonly IReadOnlySet<string> CareerPrimaryCompanies =
        new HashSet<string>(StringComparer.Ordinal) { "FrostAura Technologies", "FrostAura Labs" };

    public static readonly IReadOnlySet<string> Divisions =
        new HashSet<string>(StringComparer.Ordinal) { "Technologies", "Labs" };

    public static readonly IReadOnlySet<string> CareerRoleTracks =
        new HashSet<string>(StringComparer.Ordinal)
        {
            "Leadership / Division Building",
            "Principal Software and Platform Engineering",
            "Principal AI / ML Engineering",
            "Strategy / Capital / Partnerships",
            "Brand / Communications / Narrative",
        };

    public static readonly IReadOnlySet<string> InvestorInterestProfiles =
        new HashSet<string>(StringComparer.Ordinal)
        {
            "Operating company growth",
            "Frontier R&D exposure",
            "Strategic partnership",
        };

    public static IReadOnlySet<string> For(SubmissionOptionSet set) =>
        set switch
        {
            SubmissionOptionSet.CareerPrimaryCompany => CareerPrimaryCompanies,
            SubmissionOptionSet.Division => Divisions,
            SubmissionOptionSet.CareerRoleTrack => CareerRoleTracks,
            SubmissionOptionSet.InvestorInterestProfile => InvestorInterestProfiles,
            _ => throw new ArgumentOutOfRangeException(nameof(set), set, null),
        };
}

public enum SubmissionOptionSet
{
    CareerPrimaryCompany,
    Division,
    CareerRoleTrack,
    InvestorInterestProfile,
}

/// <summary>
/// Rejects a string, or any item of a string list, that is not in the named option set.
/// Null and empty values pass through so <see cref="RequiredAttribute"/> keeps owning presence.
/// </summary>
[AttributeUsage(AttributeTargets.Property)]
public sealed class AllowedOptionsAttribute(SubmissionOptionSet set) : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var allowed = SubmissionOptions.For(set);
        IEnumerable<string> values = value switch
        {
            null => [],
            string single when single.Length == 0 => [],
            string single => [single],
            IEnumerable items => items.Cast<object?>().Select(item => item?.ToString() ?? string.Empty),
            _ => [value.ToString() ?? string.Empty],
        };

        var rejected = values.FirstOrDefault(item => !allowed.Contains(item));

        return rejected is null
            ? ValidationResult.Success
            : new ValidationResult(
                $"'{rejected}' is not an accepted value for {validationContext.DisplayName}.",
                [validationContext.MemberName ?? validationContext.DisplayName]);
    }
}
