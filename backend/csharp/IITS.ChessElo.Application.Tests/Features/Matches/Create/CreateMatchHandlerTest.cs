using AutoFixture;
using FluentAssertions;
using IITS.ChessElo.Application.Features.Matches.Create;
using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Core.Exceptions;
using IITS.ChessElo.Domain.Matches;
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;
using Xunit;

namespace IITS.ChessElo.Application.Tests.Features.Matches.Create;

public class CreateMatchHandlerTest
{
    private readonly IFixture _fixture = new Fixture();
    private readonly IServiceProvider _serviceProvider;

    public CreateMatchHandlerTest()
    {
        _serviceProvider = new ServiceCollection()
            .AddScoped<IMatchRepository>(x => Substitute.For<IMatchRepository>())
            .AddScoped<CreateMatchHandler>()
            .BuildServiceProvider();
    }

    [Fact]
    public async Task CreateMatch_WhenTheMatchIsValid_ThenMatchIsAddedAndSaved()
    {
        // Arrange
        var command = _fixture.Create<CreateMatchCommand>();
        var handler = _serviceProvider.GetRequiredService<CreateMatchHandler>();

        // Act
        await handler.Handle(command, default);

        // Assert
        var matchRepository = _serviceProvider.GetRequiredService<IMatchRepository>();
        await matchRepository.Received(1).AddAsync(Arg.Is<Match>(x =>
            x.WhitePlayerUsername == command.WhitePlayerUsername &&
            x.BlackPlayerUsername == command.BlackPlayerUsername &&
            (int)x.Outcome == (int)command.Outcome));
        await matchRepository.UnitOfWork.ReceivedWithAnyArgs(1).SaveChangesAsync(default);
    }

    [Fact]
    public async Task CreateMatch_WhenTheMatchTimestampIsInTheFuture_ThenAnExceptionIsThrown()
    {
        // Arrange
        var command = _fixture.Build<CreateMatchCommand>()
            .Create();
        var handler = _serviceProvider.GetRequiredService<CreateMatchHandler>();

        //Act
        var act = async () => await handler.Handle(command, default);

        //Assert
        await act.Should().ThrowAsync<ValidationException>();
    }

    [Fact]
    public async Task CreateMatch_WhenTheMatchIsPlayedByTheSameUserOnBothSides_ThenAnExceptionIsThrown()
    {
        // Arrange
        var userName = _fixture.Create<string>();
        var command = _fixture.Build<CreateMatchCommand>()
            .With(x => x.WhitePlayerUsername, userName)
            .With(x => x.BlackPlayerUsername, userName)
            .Create();
        var handler = _serviceProvider.GetRequiredService<CreateMatchHandler>();

        //Act
        var act = async () => await handler.Handle(command, default);

        //Assert
        await act.Should().ThrowAsync<ValidationException>();
    }
}