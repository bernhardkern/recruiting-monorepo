using IITS.ChessElo.Application.Features.Players.Create;
using IITS.ChessElo.Application.Features.Players.GetAll;
using IITS.ChessElo.Application.Features.Players.GetByUsername;
using IITS.ChessElo.Application.Features.Players.GetEloByUsername;
using IITS.ChessElo.Application.Features.Players.Update;

namespace IITS.ChessElo.Api.Endpoints;

internal static class Players
{
    public static void MapPlayersEndpoints(this RouteGroupBuilder apiGroup)
    {
        var group = apiGroup.MapGroup("/players");
        group.MapGet("", Get);
        group.MapGet("{username}", GetByUsername);
        group.MapGet("{username}/elo", GetEloByUsername);

        group.MapPost("", Create);
        group.MapPut("{username}", Update);
    }

    private static async Task<IResult> Create(CreatePlayerCommand command,
        IMediator mediator)
    {
        await mediator.Send(command);
        return TypedResults.Ok();
    }

    private static async Task<IResult> Update(UpdatePlayerCommand command,
        IMediator mediator)
    {
        await mediator.Send(command);
        return TypedResults.Ok();
    }

    private static async Task<IResult> Get(IMediator mediator)
    {
        var result = await mediator.Send(new GetAllPlayersQuery());
        return TypedResults.Ok(result);
    }

    private static async Task<IResult> GetByUsername(string userName, IMediator mediator)
    {
        var result = await mediator.Send(new GetPlayerByUsernameQuery(userName));
        return TypedResults.Ok(result);
    }

    private static async Task<IResult> GetEloByUsername(string userName, IMediator mediator)
    {
        var result = await mediator.Send(new GetEloByUsernameQuery(userName));
        return TypedResults.Ok(result);
    }
}