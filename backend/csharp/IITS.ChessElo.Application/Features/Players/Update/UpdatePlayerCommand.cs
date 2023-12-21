namespace IITS.ChessElo.Application.Features.Players.Update;

public record UpdatePlayerCommand(string UserName, string DisplayName, string? Email) : IRequest;