using IITS.ChessElo.Domain.Core;

namespace IITS.ChessElo.Application.Repositories;

public interface IAggregateRepository<T, TId> : IEntityRepository<T, TId>
    where T : AggregateRoot<TId> where TId : notnull
{
}