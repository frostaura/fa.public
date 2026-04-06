using FrostAura.Application.Interfaces;
using FrostAura.Domain.Entities;
using FrostAura.Infrastructure.Persistence;

namespace FrostAura.Infrastructure.Repositories;

public class CareerSubmissionRepository : ICareerSubmissionRepository
{
    private readonly FrostAuraDbContext _dbContext;

    public CareerSubmissionRepository(FrostAuraDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(CareerSubmission submission, CancellationToken cancellationToken = default)
    {
        await _dbContext.CareerSubmissions.AddAsync(submission, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken = default) =>
        _dbContext.SaveChangesAsync(cancellationToken);
}
