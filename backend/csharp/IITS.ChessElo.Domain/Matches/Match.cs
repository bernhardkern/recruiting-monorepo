using IITS.ChessElo.Domain.Core.Exceptions;

namespace IITS.ChessElo.Domain.Matches;

public class Match : AggregateRoot<Guid>
{
    public string WhitePlayerUsername { get; private set; }
    public string BlackPlayerUsername { get; private set; }

    public MatchOutcome Outcome { get; private set; }

    public DateTimeOffset PlayedOn { get; private set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    private Match()
    {
    }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

    public Match(Guid id, string whitePlayerUsername, string blackPlayerUsername, MatchOutcome outcome,
        DateTimeOffset? playedOn) : base(id)
    {
        WhitePlayerUsername = whitePlayerUsername;
        BlackPlayerUsername = blackPlayerUsername;
        Outcome = outcome;
        PlayedOn = playedOn ?? DateTimeOffset.UtcNow;

        if (PlayedOn > DateTimeOffset.UtcNow)
            throw new ValidationException("The match date must not be in the future.");

        if (WhitePlayerUsername == BlackPlayerUsername)
            throw new ValidationException("The match must be played by two different users.");
    }
}