using IITS.ChessElo.Application.Features.Matches.Create;
using IITS.ChessElo.Application.Features.Matches.GetAll;

namespace IITS.ChessElo.Api.Endpoints;

internal static class Match
{
    public static void MapMatchEndpoints(this RouteGroupBuilder apiGroup)
    {
        var group = apiGroup.MapGroup("/matches");
        group.MapGet("", Get);
        group.MapPost("", Create);
    }

    private static async Task<IResult> Get(IMediator mediator)
    {
        var response = await mediator.Send(new GetAllMatchesQuery());
        return TypedResults.Ok(response);
    }

    private static async Task<IResult> Create(CreateMatchCommand command,
        IMediator mediator)
    {
        await mediator.Send(command);
        return TypedResults.Ok();
    }
}