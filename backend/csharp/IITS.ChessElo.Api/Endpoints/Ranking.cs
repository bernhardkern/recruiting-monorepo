using IITS.ChessElo.Application.Features.Rankings.GetTopPlayers;

namespace IITS.ChessElo.Api.Endpoints;

public static class Ranking
{
    public static void MapRankingEndpoints(this RouteGroupBuilder apiGroup)
    {
        var group = apiGroup.MapGroup("/rankings");
        group.MapGet("{top}", GetTopPlayers);
    }

    private static async Task<IResult> GetTopPlayers(int top, IMediator mediator)
    {
        var result = await mediator.Send(new GetTopPlayersQuery(top));
        return TypedResults.Ok(result);
    }
}