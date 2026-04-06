using FrostAura.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FrostAura.Infrastructure.Persistence;

public class FrostAuraDbContext : DbContext
{
    public FrostAuraDbContext(DbContextOptions<FrostAuraDbContext> options)
        : base(options)
    {
    }

    public DbSet<CareerSubmission> CareerSubmissions => Set<CareerSubmission>();
    public DbSet<InvestorSubmission> InvestorSubmissions => Set<InvestorSubmission>();
}
