using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Players;

namespace IITS.ChessElo.Application.Features.Players.Create;

public class CreatePlayerHandler(IPlayerRepository playerRepository) : IRequestHandler<CreatePlayerCommand, string>
{
    public async Task<string> Handle(CreatePlayerCommand request, CancellationToken cancellationToken)
    {
        var newUser = new Player(request.UserName, request.DisplayName, request.Email);

        await playerRepository.AddAsync(newUser);
        await playerRepository.UnitOfWork.SaveChangesAsync(cancellationToken);

        return newUser.UserName;
    }
}