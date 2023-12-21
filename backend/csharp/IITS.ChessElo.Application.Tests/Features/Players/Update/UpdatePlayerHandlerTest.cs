using AutoFixture;
using FluentAssertions;
using IITS.ChessElo.Application.Features.Players.Update;
using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Core.Exceptions;
using IITS.ChessElo.Domain.Players;
using JetBrains.Annotations;
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;
using Xunit;

namespace IITS.ChessElo.Application.Tests.Features.Players.Update;

[TestSubject(typeof(UpdatePlayerHandler))]
public class UpdatePlayerHandlerTest
{
    private readonly IFixture _fixture = new Fixture();
    private readonly IServiceProvider _serviceProvider;

    public UpdatePlayerHandlerTest()
    {
        _serviceProvider = new ServiceCollection()
            .AddScoped<UpdatePlayerHandler>()
            .AddScoped<IPlayerRepository>(x => Substitute.For<IPlayerRepository>())
            .BuildServiceProvider();
    }

    [Fact]
    public async Task UpdatePlayer_WhenThePlayerDoesNotExist_ThenAnExceptionIsThrown()
    {
        // Arrange
        var handler = _serviceProvider.GetRequiredService<UpdatePlayerHandler>();
        var command = new UpdatePlayerCommand(_fixture.Create<string>(), _fixture.Create<string>(),
            _fixture.Create<string>());

        // Act
        var act = async () => await handler.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<EntityNotFoundException>();
    }


    [Fact]
    public async Task UpdatePlayer_WhenThePlayerExistsAndIsValid_ThenPlayerIsUpdatedWithTheCorrectValues()
    {
        // Arrange
        var handler = _serviceProvider.GetRequiredService<UpdatePlayerHandler>();
        var command = new UpdatePlayerCommand(_fixture.Create<string>(), _fixture.Create<string>(),
            _fixture.Create<string>());
        var playerRepository = _serviceProvider.GetRequiredService<IPlayerRepository>();
        var player = _fixture.Create<Player>();
        playerRepository.GetFirstOrDefaultAsync(default!).ReturnsForAnyArgs(player);

        // Act
        var act = async () => await handler.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().NotThrowAsync();
        playerRepository.Received(1).Update(Arg.Is<Player>(x => x.DisplayName == command.DisplayName));
        playerRepository.Received(1).Update(Arg.Is<Player>(x => x.Email == command.Email));
        await playerRepository.UnitOfWork.Received(1).SaveChangesAsync(CancellationToken.None);
    }
}