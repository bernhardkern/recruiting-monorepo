using AutoMapper;
using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Players;
using IITS.ChessElo.Infrastructure.Persistence.Entities;

namespace IITS.ChessElo.Infrastructure.Persistence.Repositories;

public class PlayerRepository : EfRepository<Player, PlayerEntity, string>, IPlayerRepository
{
    public PlayerRepository(IMapper mapper, IEntityRepository<PlayerEntity, string> persistenceRepo) : base(mapper,
        persistenceRepo)
    {
    }
}