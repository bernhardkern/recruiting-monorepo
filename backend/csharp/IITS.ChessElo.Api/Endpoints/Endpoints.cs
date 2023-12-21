using IITS.ChessElo.Api.Filters;

namespace IITS.ChessElo.Api.Endpoints;

public static class Endpoints
{
    public static WebApplication MapEndpoints(this WebApplication webApplication)
    {
        var apiGroup = webApplication.MapGroup("");
        apiGroup.AddEndpointFilter<ApplicationExceptionEndpointFilter>();

        apiGroup.MapMatchEndpoints();
        apiGroup.MapRankingEndpoints();
        apiGroup.MapUserEndpoints();
        return webApplication;
    }
}