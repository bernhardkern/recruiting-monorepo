using FluentMigrator;
using IITS.ChessElo.Infrastructure.Persistence.Entities;

namespace IITS.ChessElo.Infrastructure.Persistence.Migrations;

[Migration(1)]
public class InitialMigration : Migration
{
    private const string PlayerTableName = "player";
    private const string MatchTableName = "match";

    public override void Up()
    {
        Create.Table(PlayerTableName)
            .WithColumn("UserName").AsString(255).PrimaryKey()
            .WithColumn(nameof(PlayerEntity.DisplayName)).AsString(255).NotNullable()
            .WithColumn(nameof(PlayerEntity.Email)).AsString(255)
            .WithColumn(nameof(PlayerEntity.Elo)).AsInt32();

        Create.Table(MatchTableName)
            .WithColumn(nameof(MatchEntity.Id)).AsGuid().PrimaryKey()
            .WithColumn(nameof(MatchEntity.BlackPlayerUserName)).AsString().NotNullable()
            .ForeignKey($"{nameof(MatchEntity.BlackPlayerUserName)}_{PlayerTableName}", PlayerTableName, "UserName")
            .WithColumn(nameof(MatchEntity.WhitePlayerUserName)).AsString().NotNullable()
            .ForeignKey($"{nameof(MatchEntity.WhitePlayerUserName)}_{PlayerTableName}", PlayerTableName, "UserName")
            .WithColumn(nameof(MatchEntity.Outcome)).AsString()
            .WithColumn(nameof(MatchEntity.PlayedOn)).AsInt64();
    }

    public override void Down()
    {
        Delete.Table(MatchTableName);
        Delete.Table(PlayerTableName);
    }
}