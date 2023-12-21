namespace IITS.ChessElo.Application.Features.Players.GetEloByUserName;

public record GetEloByUserNameQuery(string UserName) : IRequest<int>;