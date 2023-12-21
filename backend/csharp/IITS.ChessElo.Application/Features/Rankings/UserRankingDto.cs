using IITS.ChessElo.Application.Features.Players;

namespace IITS.ChessElo.Application.Features.Rankings;

public record UserRankingDto(int Rank, PlayerDto Player);