namespace IITS.ChessElo.Application.Features.Players;

public record PlayerDto(string Username, string DisplayName, string? Email, int Elo);