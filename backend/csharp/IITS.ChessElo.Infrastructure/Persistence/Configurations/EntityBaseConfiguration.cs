using IITS.ChessElo.Infrastructure.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IITS.ChessElo.Infrastructure.Persistence.Configurations;

public abstract class EntityBaseConfiguration<TEntity, TKey> : IEntityTypeConfiguration<TEntity>
    where TEntity : class, IDataEntity<TKey> where TKey : notnull
{
    public abstract void Configure(EntityTypeBuilder<TEntity> builder);

    protected virtual void ConfigureBaseEntity(EntityTypeBuilder<TEntity> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id)
            .ValueGeneratedNever();
    }
}