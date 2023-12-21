namespace IITS.ChessElo.Application.Features.Players;

public record PlayerDto(string UserName, string DisplayName, string? Email, int Elo);