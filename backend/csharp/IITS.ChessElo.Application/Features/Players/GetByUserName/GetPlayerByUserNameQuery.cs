namespace IITS.ChessElo.Application.Features.Players.GetByUserName;

public record GetPlayerByUserNameQuery(string UserName) : IRequest<PlayerDto>;