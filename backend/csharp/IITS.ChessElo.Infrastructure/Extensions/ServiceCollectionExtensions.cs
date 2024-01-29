using AutoMapper.EquivalencyExpression;
using AutoMapper.Extensions.EnumMapping;
using AutoMapper.Extensions.ExpressionMapping;
using FluentMigrator.Runner;
using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Infrastructure.Persistence;
using IITS.ChessElo.Infrastructure.Persistence.Mappings;
using IITS.ChessElo.Infrastructure.Persistence.Migrations;
using IITS.ChessElo.Infrastructure.Persistence.Repositories;
using IITS.ChessElo.Infrastructure.Persistence.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IITS.ChessElo.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAutoMapper();
        services.AddDatabasePersistence(configuration);
        services.AddRepositories();
        return services;
    }

    public static IServiceCollection AddAutoMapper(this IServiceCollection services)
    {
        services.AddAutoMapper(config =>
        {
            config.AddExpressionMapping();
            config.AddCollectionMappers();
            config.EnableEnumMappingValidation();
            config.AddProfile<MatchProfile>();
            config.AddProfile<PlayerProfile>();
        });
        return services;
    }

    public static IServiceCollection AddMigrationRunner(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddFluentMigratorCore()
            .ConfigureRunner(rb => rb
                .AddSQLite()
                .WithGlobalConnectionString(configuration["Database:ConnectionString"])
                .ScanIn(typeof(InitialMigration).Assembly).For.Migrations());

        return services;
    }

    private static void AddDatabasePersistence(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlite(configuration["Database:ConnectionString"]));
        services.AddScoped<IDatabaseInitializerService, DatabaseInitializerService>();
    }

    private static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped(typeof(IEntityRepository<,>), typeof(DataEntityRepository<,>));
        services.AddScoped<IPlayerRepository, PlayerRepository>();
        services.AddScoped<IMatchRepository, MatchRepository>();
    }
}