namespace IITS.ChessElo.Application.Features.Matches.Create;

public record CreateMatchCommand(
    string WhitePlayerUsername,
    string BlackPlayerUsername,
    Outcome Outcome) : IRequest<Guid>;