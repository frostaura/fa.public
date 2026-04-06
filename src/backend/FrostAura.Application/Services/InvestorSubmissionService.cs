using FrostAura.Application.Contracts;
using FrostAura.Application.Interfaces;
using FrostAura.Domain.Entities;

namespace FrostAura.Application.Services;

public class InvestorSubmissionService
{
    private readonly IInvestorSubmissionRepository _repository;
    private readonly ISubmissionNotificationService _notificationService;

    public InvestorSubmissionService(
        IInvestorSubmissionRepository repository,
        ISubmissionNotificationService notificationService)
    {
        _repository = repository;
        _notificationService = notificationService;
    }

    public async Task<SubmissionReceipt> SubmitAsync(
        InvestorSubmissionRequest request,
        CancellationToken cancellationToken = default)
    {
        var submission = new InvestorSubmission
        {
            FullName = request.FullName,
            Organization = request.Organization,
            Email = request.Email,
            InvestorType = request.InvestorType,
            Region = request.Region,
            CompanyInterest = string.Join("; ", request.CompanyInterest),
            InterestProfile = request.InterestProfile,
            CapitalRange = request.CapitalRange,
            TimeHorizon = request.TimeHorizon,
            PreferredMode = request.PreferredMode,
            Thesis = request.Thesis,
            ValueAdd = request.ValueAdd,
            ExtraNote = request.ExtraNote ?? string.Empty,
            SubmittedAt = request.SubmittedAt ?? string.Empty,
            SubmittedFrom = request.SubmittedFrom ?? string.Empty,
            Host = request.Host ?? string.Empty,
        };

        await _repository.AddAsync(submission, cancellationToken);

        var delivery = await _notificationService.SendInvestorSubmissionAsync(submission, cancellationToken);
        submission.AutoResponseDelivered = delivery.AutoResponseDelivered;
        submission.SupportNotificationDelivered = delivery.SupportNotificationDelivered;
        submission.SubmissionStatus = delivery.AutoResponseDelivered && delivery.SupportNotificationDelivered
            ? "Processed"
            : "Received";

        await _repository.SaveChangesAsync(cancellationToken);

        return new SubmissionReceipt(
            submission.Id.ToString("N"),
            submission.SubmissionStatus,
            submission.AutoResponseDelivered,
            submission.SupportNotificationDelivered,
            submission.ReceivedAtUtc);
    }
}
