using AutoMapper;
using IITS.ChessElo.Domain.Players;
using IITS.ChessElo.Infrastructure.Persistence.Entities;

namespace IITS.ChessElo.Infrastructure.Persistence.Mappings;

internal class PlayerProfile : Profile
{
    public PlayerProfile()
    {
        ShouldUseConstructor = constructor => constructor.IsPrivate;

        CreateMap<Player, PlayerEntity>();
        CreateMap<PlayerEntity, Player>()
            .ForMember(x => x.Username, x => x.MapFrom(y => y.Id));
    }
}