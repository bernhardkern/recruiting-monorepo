using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Core.Exceptions;

namespace IITS.ChessElo.Application.Features.Players.Update;

public class UpdatePlayerHandler(IPlayerRepository playerRepository) : IRequestHandler<UpdatePlayerCommand>
{
    public async Task Handle(UpdatePlayerCommand request, CancellationToken cancellationToken)
    {
        var player = await playerRepository.GetFirstOrDefaultAsync(x => x.Username == request.Username);
        if (player == null) throw new EntityNotFoundException("Player with username not found.");

        player.UpdateDisplayName(request.DisplayName);
        player.UpdateEmail(request.Email);

        playerRepository.Update(player);
        await playerRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
    }
}