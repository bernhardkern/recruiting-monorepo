using IITS.ChessElo.Domain.Matches;

namespace IITS.ChessElo.Application.Repositories;

public interface IMatchRepository : IWriteRepository<Match>, IReadRepository<Match>
{
}