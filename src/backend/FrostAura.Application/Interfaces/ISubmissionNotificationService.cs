using FrostAura.Application.Contracts;
using FrostAura.Domain.Entities;

namespace FrostAura.Application.Interfaces;

public interface ISubmissionNotificationService
{
    Task<NotificationDeliveryResult> SendCareerSubmissionAsync(
        CareerSubmission submission,
        CancellationToken cancellationToken = default);

    Task<NotificationDeliveryResult> SendInvestorSubmissionAsync(
        InvestorSubmission submission,
        CancellationToken cancellationToken = default);
}
