using AutoFixture;
using IITS.ChessElo.Application.Features.Matches.Create;

namespace IITS.ChessElo.Application.Tests.Features.Matches;

internal static class FixtureExtensions
{
    public static IFixture CustomizeMatchFixtures(this IFixture fixture)
    {
        fixture.Customize<CreateMatchCommand>(x =>
            x.With(y => y.Timestamp, DateProvider.GetRandomDateTimeBeforeUtcNow()));
        return fixture;
    }
}