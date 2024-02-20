namespace IITS.ChessElo.Application.Features.Players.GetEloByUsername;

public record GetEloByUsernameQuery(string Username) : IRequest<int>;