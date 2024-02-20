using IITS.ChessElo.Api.Filters;

namespace IITS.ChessElo.Api.Endpoints;

public static class Endpoints
{
    public static WebApplication MapEndpoints(this WebApplication webApplication)
    {
        var apiGroup = webApplication.MapGroup("");
        apiGroup.AddEndpointFilter<ApplicationExceptionEndpointFilter>();

        apiGroup.MapMatchesEndpoints();
        apiGroup.MapRankingsEndpoints();
        apiGroup.MapPlayersEndpoints();
        return webApplication;
    }
}