using IITS.ChessElo.Domain.Core;

namespace IITS.ChessElo.Infrastructure.Persistence.Entities;

public interface IDataEntity<out TId> : IEntity<TId> where TId : notnull
{
}