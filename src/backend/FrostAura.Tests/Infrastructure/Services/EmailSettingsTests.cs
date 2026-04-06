using FrostAura.Infrastructure.Configuration;

namespace FrostAura.Tests.Infrastructure.Services;

public class EmailSettingsTests
{
    [Fact]
    public void IsConfigured_WithAnonymousRelayAndSenderEmail_ShouldBeTrue()
    {
        var settings = new EmailSettings
        {
            Server = "mailhog",
            Port = 1025,
            SenderEmail = "noreply@frostaura.local",
            SenderName = "FrostAura",
            Account = string.Empty,
            Password = string.Empty,
            EnableSsl = false,
        };

        Assert.True(settings.IsConfigured);
        Assert.False(settings.HasAuthenticationCredentials);
    }

    [Fact]
    public void IsConfigured_WithoutSenderEmail_ShouldBeFalse()
    {
        var settings = new EmailSettings
        {
            Server = "mailhog",
            SenderEmail = string.Empty,
        };

        Assert.False(settings.IsConfigured);
    }

    [Fact]
    public void HasAuthenticationCredentials_WithUsernameAndPassword_ShouldBeTrue()
    {
        var settings = new EmailSettings
        {
            Server = "smtp.example.com",
            SenderEmail = "noreply@example.com",
            Account = "mailer",
            Password = "secret",
        };

        Assert.True(settings.IsConfigured);
        Assert.True(settings.HasAuthenticationCredentials);
    }
}
