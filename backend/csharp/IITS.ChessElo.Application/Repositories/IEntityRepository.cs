using IITS.ChessElo.Domain.Core;

namespace IITS.ChessElo.Application.Repositories;

public interface IEntityRepository<T, TId> : IReadRepository<T>, IWriteRepository<T>
    where T : IEntity<TId> where TId : notnull
{
    /// <summary>
    /// Finds an entity from data store.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    T? Find(TId id);

    /// <summary>
    /// Asynchronously finds an entity from data store.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    ValueTask<T?> FindAsync(TId id);
}