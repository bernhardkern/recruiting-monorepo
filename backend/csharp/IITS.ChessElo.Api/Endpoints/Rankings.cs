using IITS.ChessElo.Application.Features.Rankings.GetTopPlayers;
using Microsoft.AspNetCore.Mvc;

namespace IITS.ChessElo.Api.Endpoints;

internal static class Rankings
{
    public static void MapRankingsEndpoints(this RouteGroupBuilder apiGroup)
    {
        var group = apiGroup.MapGroup("/rankings");
        group.MapGet("", GetTopPlayers);
    }

    private static async Task<IResult> GetTopPlayers([FromQuery]int top, IMediator mediator)
    {
        var result = await mediator.Send(new GetTopPlayersQuery(top));
        return TypedResults.Ok(result);
    }
}