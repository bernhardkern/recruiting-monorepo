namespace IITS.ChessElo.Application.Features.Matches;

public record MatchDto(
    Guid Id,
    string WhitePlayerUsername,
    string BlackPlayerUsername,
    Outcome Outcome,
    DateTimeOffset PlayedOn);