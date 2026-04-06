using FrostAura.Application.Contracts;
using FrostAura.Application.Interfaces;
using FrostAura.Domain.Entities;

namespace FrostAura.Application.Services;

public class CareerSubmissionService
{
    private readonly ICareerSubmissionRepository _repository;
    private readonly ISubmissionNotificationService _notificationService;

    public CareerSubmissionService(
        ICareerSubmissionRepository repository,
        ISubmissionNotificationService notificationService)
    {
        _repository = repository;
        _notificationService = notificationService;
    }

    public async Task<SubmissionReceipt> SubmitAsync(
        CareerSubmissionRequest request,
        CancellationToken cancellationToken = default)
    {
        var submission = new CareerSubmission
        {
            PrimaryCompanyInterest = request.PrimaryCompanyInterest,
            RoleTrack = request.RoleTrack,
            AvailabilityWindow = request.AvailabilityWindow,
            Location = request.Location,
            AdjacentCompanyInterest = string.Join("; ", request.AdjacentCompanyInterest),
            FullName = request.FullName,
            Email = request.Email,
            Website = request.Website ?? string.Empty,
            Portfolio = request.Portfolio ?? string.Empty,
            RecentRole = request.RecentRole,
            ResumeLink = request.ResumeLink ?? string.Empty,
            HighestLeverageContribution = request.HighestLeverageContribution,
            ProofOfWork = request.ProofOfWork,
            ExtraNote = request.ExtraNote ?? string.Empty,
            SubmittedAt = request.SubmittedAt ?? string.Empty,
            SubmittedFrom = request.SubmittedFrom ?? string.Empty,
            Host = request.Host ?? string.Empty,
        };

        await _repository.AddAsync(submission, cancellationToken);

        var delivery = await _notificationService.SendCareerSubmissionAsync(submission, cancellationToken);
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
