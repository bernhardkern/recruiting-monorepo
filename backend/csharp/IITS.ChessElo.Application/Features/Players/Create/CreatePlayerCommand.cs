namespace IITS.ChessElo.Application.Features.Players.Create;

public record CreatePlayerCommand(string Username, string DisplayName, string? Email) : IRequest<string>;