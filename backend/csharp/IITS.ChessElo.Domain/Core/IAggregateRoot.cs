namespace IITS.ChessElo.Domain.Core;

public interface IAggregateRoot<TId> where TId : notnull
{
    TId Id { get; }
}