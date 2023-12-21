using IITS.ChessElo.Domain.Matches;

namespace IITS.ChessElo.Infrastructure.Persistence.Entities;

public class MatchEntity : DataEntityBase<Guid>
{
    public required string WhitePlayerUserName { get; set; }
    public required PlayerEntity WhitePlayer { get; set; }
    public required string BlackPlayerUserName { get; set; }
    public required PlayerEntity BlackPlayer { get; set; }

    public DateTimeOffset PlayedOn { get; set; }

    public MatchOutcome Outcome { get; set; }
}