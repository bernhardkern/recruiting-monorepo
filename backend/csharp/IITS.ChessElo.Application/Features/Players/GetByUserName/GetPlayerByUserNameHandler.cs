using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Core.Exceptions;

namespace IITS.ChessElo.Application.Features.Players.GetByUserName;

public class GetPlayerByUserNameHandler(IPlayerRepository playerRepository)
    : IRequestHandler<GetPlayerByUserNameQuery, PlayerDto>
{
    public async Task<PlayerDto> Handle(GetPlayerByUserNameQuery request, CancellationToken cancellationToken)
    {
        var player = await playerRepository.GetFirstOrDefaultAsync(x => x.UserName == request.UserName);
        if (player == null) throw new EntityNotFoundException("Player not found.");

        return new PlayerDto(player.UserName, player.DisplayName, player.Email, player.Elo);
    }
}