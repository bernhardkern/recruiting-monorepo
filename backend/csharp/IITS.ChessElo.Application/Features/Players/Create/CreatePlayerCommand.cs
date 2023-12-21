namespace IITS.ChessElo.Application.Features.Players.Create;

public record CreatePlayerCommand(string UserName, string DisplayName, string? Email) : IRequest<string>;