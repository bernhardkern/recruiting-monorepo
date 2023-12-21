using IITS.ChessElo.Application.Repositories;

namespace IITS.ChessElo.Application.Features.Players.GetAll;

public class GetAllPlayersHandler(IPlayerRepository playerRepository)
    : IRequestHandler<GetAllPlayersQuery, List<PlayerDto>>
{
    public Task<List<PlayerDto>> Handle(GetAllPlayersQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(playerRepository.GetAll()
            .Select(s => new PlayerDto(s.UserName, s.DisplayName, s.Email, s.Elo))
            .ToList());
    }
}