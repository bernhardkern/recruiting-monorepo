namespace IITS.ChessElo.Application.Features.Players.Update;

public record UpdatePlayerCommand(string Username, string DisplayName, string? Email) : IRequest;