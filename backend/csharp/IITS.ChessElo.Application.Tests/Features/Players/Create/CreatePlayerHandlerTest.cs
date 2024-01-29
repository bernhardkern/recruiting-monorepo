using AutoFixture;
using FluentAssertions;
using IITS.ChessElo.Application.Features.Players.Create;
using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Players;
using JetBrains.Annotations;
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;
using Xunit;

namespace IITS.ChessElo.Application.Tests.Features.Players.Create;

[TestSubject(typeof(CreatePlayerHandler))]
public class CreatePlayerHandlerTest
{
    private readonly IFixture _fixture = new Fixture();
    private readonly IServiceProvider _serviceProvider;

    public CreatePlayerHandlerTest()
    {
        _serviceProvider = new ServiceCollection()
            .AddScoped<IPlayerRepository>(x => Substitute.For<IPlayerRepository>())
            .AddScoped<CreatePlayerHandler>()
            .BuildServiceProvider();
    }

    [Fact]
    public async Task CreatePlayer_WhenThePlayerIsValid_ThenPlayerIsAddedAndSaved()
    {
        // Arrange
        var handler = _serviceProvider.GetRequiredService<CreatePlayerHandler>();
        var command = new CreatePlayerCommand(_fixture.Create<string>(), _fixture.Create<string>(),
            _fixture.Create<string>());

        // Act
        var act = async () => await handler.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().NotThrowAsync();
        var playerRepository = _serviceProvider.GetRequiredService<IPlayerRepository>();
        await playerRepository.Received(1).AddAsync(Arg.Any<Player>());
        await playerRepository.Received(1).UnitOfWork.SaveChangesAsync(CancellationToken.None);
    }
}