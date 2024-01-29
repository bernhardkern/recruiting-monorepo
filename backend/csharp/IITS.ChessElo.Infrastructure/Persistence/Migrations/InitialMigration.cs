using System.Reflection;
using System.Text.Json;
using FluentMigrator;
using IITS.ChessElo.Application.Features.Matches;
using IITS.ChessElo.Infrastructure.Persistence.Entities;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

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

        var players = new List<PlayerEntity>();
        var playerData = GetInitialPlayers();

        foreach (var data in playerData)
        {
            var player = new PlayerEntity
            {
                Id = data.UserName,
                Email = data.Email,
                DisplayName = data.UserName,
                Elo = new Random().Next(300, 2000)
            };
            players.Add(player);
            Insert.IntoTable(PlayerTableName).Row(new
                { UserName = player.Id, DisplayName = player.DisplayName, Email = player.Email, Elo = player.Elo });
        }

        var converter = new DateTimeOffsetToStringConverter();
        for (var i = 0; i < 1000; i++)
        {
            var randomDay = new Random().Next(0, 365);
            var randomOutcome = new Random().Next(1, 4);
            var randomWhitePlayer = new Random().Next(0, players.Count);
            var randomBlackPlayer = new Random().Next(0, players.Count);
            if (randomWhitePlayer == randomBlackPlayer)
                continue;

            var outcome = (Outcome)randomOutcome;
            var whitePlayer = players.Skip(randomWhitePlayer).First();
            var blackPlayer = players.Skip(randomBlackPlayer).First();
            Insert.IntoTable(MatchTableName).Row(new
            {
                Id = Guid.NewGuid(), BlackPlayerUserName = blackPlayer.Id, WhitePlayerUserName = whitePlayer.Id,
                Outcome = outcome.ToString(),
                PlayedOn = converter.ConvertToProvider(DateTimeOffset.UtcNow.AddDays(-1 * randomDay))
            });
        }
    }

    private List<PlayerData> GetInitialPlayers()
    {
        var assembly = Assembly.GetExecutingAssembly();
        var playersResource = assembly.GetManifestResourceNames().First(x => x.Contains("InitialPlayers.json"));
        using var stream = assembly.GetManifestResourceStream(playersResource);
        var data = JsonSerializer.Deserialize<List<PlayerData>>(stream!, new JsonSerializerOptions()
        {
            PropertyNameCaseInsensitive = true
        });
        return data ?? new List<PlayerData>();
    }

    public override void Down()
    {
        Delete.Table(MatchTableName);
        Delete.Table(PlayerTableName);
    }


    private sealed record PlayerData(string UserName, string Email);
}