using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Core.Exceptions;

namespace IITS.ChessElo.Application.Features.Players.GetEloByUsername;

public class GetEloByUsernameHandler(IPlayerRepository playerRepository) : IRequestHandler<GetEloByUsernameQuery, int>
{
    public async Task<int> Handle(GetEloByUsernameQuery request, CancellationToken cancellationToken)
    {
        var player = await playerRepository.GetFirstOrDefaultAsync(x => x.Username == request.Username);
        if (player == null) throw new EntityNotFoundException("Player not found.");
        return player.Elo;
    }
}