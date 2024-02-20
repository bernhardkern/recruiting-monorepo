using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Core.Exceptions;

namespace IITS.ChessElo.Application.Features.Players.GetByUsername;

public class GetPlayerByUsernameHandler(IPlayerRepository playerRepository)
    : IRequestHandler<GetPlayerByUsernameQuery, PlayerDto>
{
    public async Task<PlayerDto> Handle(GetPlayerByUsernameQuery request, CancellationToken cancellationToken)
    {
        var player = await playerRepository.GetFirstOrDefaultAsync(x => x.Username == request.Username);
        if (player == null) throw new EntityNotFoundException("Player not found.");

        return new PlayerDto(player.Username, player.DisplayName, player.Email, player.Elo);
    }
}