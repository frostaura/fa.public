using FrostAura.Application.Interfaces;
using FrostAura.Domain.Entities;
using FrostAura.Infrastructure.Persistence;

namespace FrostAura.Infrastructure.Repositories;

public class InvestorSubmissionRepository : IInvestorSubmissionRepository
{
    private readonly FrostAuraDbContext _dbContext;

    public InvestorSubmissionRepository(FrostAuraDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(InvestorSubmission submission, CancellationToken cancellationToken = default)
    {
        await _dbContext.InvestorSubmissions.AddAsync(submission, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken = default) =>
        _dbContext.SaveChangesAsync(cancellationToken);
}
