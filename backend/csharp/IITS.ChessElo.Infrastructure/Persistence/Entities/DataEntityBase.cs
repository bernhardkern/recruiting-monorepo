namespace IITS.ChessElo.Infrastructure.Persistence.Entities;

public class DataEntityBase<TId> : IDataEntity<TId> where TId : notnull
{
    public TId Id { get; set; } = default!;
}