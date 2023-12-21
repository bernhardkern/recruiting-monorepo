using IITS.ChessElo.Domain.Core.Exceptions;

namespace IITS.ChessElo.Domain.Matches;

public class Match : AggregateRoot<Guid>
{
    public string WhitePlayerUserName { get; private set; }
    public string BlackPlayerUserName { get; private set; }

    public MatchOutcome Outcome { get; private set; }

    public DateTimeOffset PlayedOn { get; private set; }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    private Match()
    {
    }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

    public Match(Guid id, string whitePlayerUserName, string blackPlayerUserName, MatchOutcome outcome,
        DateTimeOffset? playedOn) : base(id)
    {
        WhitePlayerUserName = whitePlayerUserName;
        BlackPlayerUserName = blackPlayerUserName;
        Outcome = outcome;
        PlayedOn = playedOn ?? DateTimeOffset.UtcNow;

        if (PlayedOn > DateTimeOffset.UtcNow)
            throw new ValidationException("The match date must not be in the future.");

        if (WhitePlayerUserName == BlackPlayerUserName)
            throw new ValidationException("The match must be played by two different users.");
    }
}