namespace IITS.ChessElo.Application.Features.Rankings.GetTopPlayers;

public record GetTopPlayersQuery(int TopNumberOfPlayers) : IRequest<List<UserRankingDto>>;