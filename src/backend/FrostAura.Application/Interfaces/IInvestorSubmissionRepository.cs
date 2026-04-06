using FrostAura.Domain.Entities;

namespace FrostAura.Application.Interfaces;

public interface IInvestorSubmissionRepository
{
    Task AddAsync(InvestorSubmission submission, CancellationToken cancellationToken = default);
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}
