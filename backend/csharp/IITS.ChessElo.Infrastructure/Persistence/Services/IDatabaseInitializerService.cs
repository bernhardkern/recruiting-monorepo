namespace IITS.ChessElo.Infrastructure.Persistence.Services;

public interface IDatabaseInitializerService
{
    Task MigrateAsync(CancellationToken cancellationToken);
}