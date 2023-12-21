using AutoMapper;
using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Matches;
using IITS.ChessElo.Infrastructure.Persistence.Entities;

namespace IITS.ChessElo.Infrastructure.Persistence.Repositories;

public class MatchRepository : EfRepository<Match, MatchEntity, Guid>, IMatchRepository
{
    public MatchRepository(IMapper mapper, IEntityRepository<MatchEntity, Guid> persistenceRepo) : base(mapper,
        persistenceRepo)
    {
    }
}