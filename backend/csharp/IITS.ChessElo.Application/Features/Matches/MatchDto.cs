namespace IITS.ChessElo.Application.Features.Matches;

public record MatchDto(
    Guid Id,
    string WhitePlayerUserName,
    string BlackPlayerUserName,
    Outcome Outcome,
    DateTimeOffset Timestamp);