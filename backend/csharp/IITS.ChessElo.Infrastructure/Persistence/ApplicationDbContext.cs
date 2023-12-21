using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Infrastructure.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace IITS.ChessElo.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IUnitOfWork
{
    public DbSet<PlayerEntity> Users { get; set; } = null!;
    public DbSet<MatchEntity> Matches { get; set; } = null!;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
        base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}