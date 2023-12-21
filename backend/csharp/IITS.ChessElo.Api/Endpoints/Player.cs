using IITS.ChessElo.Application.Features.Players.Create;
using IITS.ChessElo.Application.Features.Players.GetAll;
using IITS.ChessElo.Application.Features.Players.GetByUserName;
using IITS.ChessElo.Application.Features.Players.GetEloByUserName;
using IITS.ChessElo.Application.Features.Players.Update;

namespace IITS.ChessElo.Api.Endpoints;

public static class User
{
    public static void MapUserEndpoints(this RouteGroupBuilder apiGroup)
    {
        var group = apiGroup.MapGroup("/players");
        group.MapGet("", Get);
        group.MapGet("{userName}", GetByUserName);
        group.MapGet("{userName}/elo", GetEloByUserName);

        group.MapPost("", Create);
        group.MapPut("{userName}", Update);
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

    private static async Task<IResult> GetByUserName(string userName, IMediator mediator)
    {
        var result = await mediator.Send(new GetPlayerByUserNameQuery(userName));
        return TypedResults.Ok(result);
    }

    private static async Task<IResult> GetEloByUserName(string userName, IMediator mediator)
    {
        var result = await mediator.Send(new GetEloByUserNameQuery(userName));
        return TypedResults.Ok(result);
    }
}