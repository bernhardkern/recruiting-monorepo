using IITS.ChessElo.Infrastructure.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IITS.ChessElo.Infrastructure.Persistence.Configurations;

public class UserEntityConfiguration : IEntityTypeConfiguration<PlayerEntity>
{
    public void Configure(EntityTypeBuilder<PlayerEntity> builder)
    {
        builder.ToTable("player");
        builder.Property(x => x.Id).HasColumnName("UserName");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).ValueGeneratedNever();

        builder.HasMany(x => x.WhiteMatches)
            .WithOne(x => x.WhitePlayer)
            .HasForeignKey(x => x.WhitePlayerUserName);

        builder.HasMany(x => x.BlackMatches)
            .WithOne(x => x.BlackPlayer)
            .HasForeignKey(x => x.BlackPlayerUserName);
    }
}