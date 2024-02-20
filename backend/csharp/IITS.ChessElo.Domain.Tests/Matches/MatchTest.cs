using AutoFixture;
using FluentAssertions;
using IITS.ChessElo.Domain.Core.Exceptions;
using IITS.ChessElo.Domain.Matches;
using Xunit;

namespace IITS.ChessElo.Domain.Tests.Matches;

public class MatchTest
{
    private readonly Fixture _fixture = new();

    [Fact]
    public void WhenTheMatchIsValid_ThenNoExceptionIsThrown()
    {
        // Arrange
        var id = _fixture.Create<Guid>();
        var whitePlayerUsername = _fixture.Create<string>();
        var blackPlayerUsername = _fixture.Create<string>();
        var outcome = _fixture.Create<MatchOutcome>();
        var playedOn = DateProvider.GetRandomDateTimeBeforeUtcNow();

        //Act
        var act = () => new Match(id, whitePlayerUsername, blackPlayerUsername, outcome, playedOn);

        //Assert
        act.Should().NotThrow();
    }

    [Fact]
    public void WhenTheMatchTimestampIsInTheFuture_ThenAnExceptionIsThrown()
    {
        // Arrange
        var id = _fixture.Create<Guid>();
        var whitePlayerUsername = _fixture.Create<string>();
        var blackPlayerUsername = _fixture.Create<string>();
        var outcome = _fixture.Create<MatchOutcome>();
        var playedOn = DateProvider.GetRandomDateTimeAfterUtcNow();

        //Act
        var act = () => new Match(id, whitePlayerUsername, blackPlayerUsername, outcome, playedOn);

        //Assert
        act.Should().Throw<ValidationException>();
    }

    [Fact]
    public void WhenTheMatchIsPlayedByTheSameUserOnBothSides_ThenAnExceptionIsThrown()
    {
        // Arrange
        var id = _fixture.Create<Guid>();
        var whitePlayerUsername = _fixture.Create<string>();
        var blackPlayerUsername = whitePlayerUsername;
        var outcome = _fixture.Create<MatchOutcome>();
        var playedOn = DateProvider.GetRandomDateTimeBeforeUtcNow();

        //Act
        var act = () => new Match(id, whitePlayerUsername, blackPlayerUsername, outcome, playedOn);

        //Assert
        act.Should().Throw<ValidationException>();
    }
}