using AutoMapper;
using IITS.ChessElo.Domain.Matches;
using IITS.ChessElo.Infrastructure.Persistence.Entities;

namespace IITS.ChessElo.Infrastructure.Persistence.Mappings;

internal class MatchProfile : Profile
{
    public MatchProfile()
    {
        ShouldUseConstructor = constructor => constructor.IsPrivate;

        CreateMap<Match, MatchEntity>()
            .ReverseMap();
    }
}