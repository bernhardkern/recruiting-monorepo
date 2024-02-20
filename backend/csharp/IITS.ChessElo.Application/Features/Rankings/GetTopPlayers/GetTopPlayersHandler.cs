using IITS.ChessElo.Application.Features.Players;
using IITS.ChessElo.Application.Repositories;

namespace IITS.ChessElo.Application.Features.Rankings.GetTopPlayers;

public class GetTopPlayersHandler(IPlayerRepository playerRepository)
    : IRequestHandler<GetTopPlayersQuery, List<UserRankingDto>>
{
    public Task<List<UserRankingDto>> Handle(GetTopPlayersQuery request, CancellationToken cancellationToken)
    {
        var players = playerRepository.GetAll().OrderByDescending(x => x.Elo).Take(request.TopNumberOfPlayers).ToList();
        return
            Task.FromResult(
                players.Select((user, i) =>
                    new UserRankingDto(i + 1, new PlayerDto(user.Username, user.DisplayName, user.Email, user.Elo))
                ).ToList());
    }
}