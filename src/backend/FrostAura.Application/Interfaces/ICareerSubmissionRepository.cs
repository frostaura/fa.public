using FrostAura.Domain.Entities;

namespace FrostAura.Application.Interfaces;

public interface ICareerSubmissionRepository
{
    Task AddAsync(CareerSubmission submission, CancellationToken cancellationToken = default);
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}
