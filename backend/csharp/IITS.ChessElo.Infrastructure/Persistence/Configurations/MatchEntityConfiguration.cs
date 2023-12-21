using IITS.ChessElo.Infrastructure.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IITS.ChessElo.Infrastructure.Persistence.Configurations;

public class MatchEntityConfiguration : EntityBaseConfiguration<MatchEntity, Guid>
{
    public override void Configure(EntityTypeBuilder<MatchEntity> builder)
    {
        builder.ToTable("match");
        ConfigureBaseEntity(builder);

        builder.Property(x => x.PlayedOn).HasConversion<long>();
    }
}