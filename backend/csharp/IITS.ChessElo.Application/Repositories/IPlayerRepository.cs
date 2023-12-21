using IITS.ChessElo.Domain.Players;

namespace IITS.ChessElo.Application.Repositories;

public interface IPlayerRepository : IWriteRepository<Player>, IReadRepository<Player>
{
}