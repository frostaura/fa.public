namespace FrostAura.Infrastructure.Configuration;

public class EmailSettings
{
    public const string SectionName = "FrostAura:Email";

    public string Server { get; set; } = string.Empty;
    public int Port { get; set; } = 587;
    public string Account { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string SenderEmail { get; set; } = string.Empty;
    public string SenderName { get; set; } = "FrostAura";
    public bool EnableSsl { get; set; } = true;
    public int TimeoutSeconds { get; set; } = 30;
    public string SupportEmail { get; set; } = string.Empty;
    public string PublicAppUrl { get; set; } = string.Empty;
    public string BrandName { get; set; } = "FrostAura";
    public string BrandOwner { get; set; } = "FrostAura";
    public string BrandPrimaryColor { get; set; } = "#6f7ef7";
    public string BrandAlertColor { get; set; } = "#7c6cff";

    public bool IsConfigured =>
        !string.IsNullOrWhiteSpace(Server) &&
        !string.IsNullOrWhiteSpace(SenderEmail);

    public bool HasAuthenticationCredentials =>
        !string.IsNullOrWhiteSpace(Account) &&
        !string.IsNullOrWhiteSpace(Password);
}
