using System.Net.Sockets;
using System.Security.Authentication;
using FrostAura.Application.Interfaces;
using FrostAura.Infrastructure.Configuration;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;

namespace FrostAura.Infrastructure.Services.Email;

public class SmtpEmailService : IEmailService
{
    private readonly EmailSettings _settings;
    private readonly ILogger<SmtpEmailService> _logger;

    public SmtpEmailService(IOptions<EmailSettings> settings, ILogger<SmtpEmailService> logger)
    {
        _settings = settings.Value;
        _logger = logger;
    }

    public bool IsConfigured => _settings.IsConfigured;

    public async Task<bool> SendEmailAsync(
        string toEmail,
        string subject,
        string htmlBody,
        CancellationToken cancellationToken = default)
    {
        if (!IsConfigured)
        {
            _logger.LogWarning("Email service not configured. Skipping outbound mail to {Email}.", toEmail);
            return false;
        }

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_settings.SenderName, _settings.SenderEmail));
        message.To.Add(MailboxAddress.Parse(toEmail));
        message.Subject = subject;
        message.Body = new BodyBuilder { HtmlBody = htmlBody }.ToMessageBody();

        using var client = new SmtpClient();
        client.Timeout = _settings.TimeoutSeconds * 1000;

        var secureSocketOptions = _settings.Port == 465
            ? SecureSocketOptions.SslOnConnect
            : (_settings.EnableSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.None);

        try
        {
            await client.ConnectAsync(_settings.Server, _settings.Port, secureSocketOptions, cancellationToken);

            if (_settings.HasAuthenticationCredentials)
            {
                await client.AuthenticateAsync(_settings.Account, _settings.Password, cancellationToken);
            }

            await client.SendAsync(message, cancellationToken);
            await client.DisconnectAsync(true, cancellationToken);

            _logger.LogInformation("Email sent successfully to {Email}.", toEmail);
            return true;
        }
        catch (FormatException exception)
        {
            _logger.LogError(exception, "Invalid email payload for {Email}.", toEmail);
            return false;
        }
        catch (SmtpCommandException exception)
        {
            _logger.LogError(exception, "SMTP command failure while emailing {Email}.", toEmail);
            return false;
        }
        catch (SmtpProtocolException exception)
        {
            _logger.LogError(exception, "SMTP protocol failure while emailing {Email}.", toEmail);
            return false;
        }
        catch (System.Security.Authentication.AuthenticationException exception)
        {
            _logger.LogError(exception, "SMTP authentication failure while emailing {Email}.", toEmail);
            return false;
        }
        catch (SocketException exception)
        {
            _logger.LogError(exception, "SMTP socket failure while emailing {Email}.", toEmail);
            return false;
        }
    }
}
