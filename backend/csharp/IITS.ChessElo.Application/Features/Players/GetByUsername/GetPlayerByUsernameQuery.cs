namespace IITS.ChessElo.Application.Features.Players.GetByUsername;

public record GetPlayerByUsernameQuery(string Username) : IRequest<PlayerDto>;