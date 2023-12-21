using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Core.Exceptions;

namespace IITS.ChessElo.Application.Features.Players.GetEloByUserName;

public class GetEloByUserNameHandler(IPlayerRepository playerRepository) : IRequestHandler<GetEloByUserNameQuery, int>
{
    public async Task<int> Handle(GetEloByUserNameQuery request, CancellationToken cancellationToken)
    {
        var player = await playerRepository.GetFirstOrDefaultAsync(x => x.UserName == request.UserName);
        if (player == null) throw new EntityNotFoundException("Player not found.");
        return player.Elo;
    }
}