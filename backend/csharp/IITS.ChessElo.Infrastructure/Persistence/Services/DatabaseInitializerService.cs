using FluentMigrator.Runner;

namespace IITS.ChessElo.Infrastructure.Persistence.Services;

public class DatabaseInitializerService : IDatabaseInitializerService
{
    private readonly IMigrationRunner _migrationRunner;

    public DatabaseInitializerService(IMigrationRunner migrationRunner)
    {
        _migrationRunner = migrationRunner;
    }

    public Task MigrateAsync(CancellationToken cancellationToken)
    {
        _migrationRunner.MigrateUp();

        return Task.CompletedTask;
    }
}