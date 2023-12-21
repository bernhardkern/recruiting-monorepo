namespace IITS.ChessElo.Domain.Core;

public interface IEntity<out TId> where TId : notnull
{
    TId Id { get; }
}