using AutoFixture;

namespace IITS.ChessElo.Application.Tests;

internal static class DateProvider
{
    private static readonly Fixture Fixture = new();

    public static DateTimeOffset GetRandomDateTimeBeforeUtcNow()
    {
        return DateTimeOffset.UtcNow.AddMinutes(-1) - Fixture.Create<TimeSpan>();
    }

    public static DateTimeOffset GetRandomDateTimeAfterUtcNow()
    {
        return DateTimeOffset.UtcNow.AddMinutes(1) + Fixture.Create<TimeSpan>();
    }
}