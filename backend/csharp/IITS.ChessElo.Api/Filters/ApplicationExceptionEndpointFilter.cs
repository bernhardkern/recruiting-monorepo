using IITS.ChessElo.Domain.Core.Exceptions;

namespace IITS.ChessElo.Api.Filters;

public class ApplicationExceptionEndpointFilter : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        try
        {
            return await next(context);
        }
        catch (EntityNotFoundException exception)
        {
            context.HttpContext.Response.StatusCode = 404;
            return ValueTask.FromResult(new { Error = exception.Message });
        }
        catch (ValidationException exception)
        {
            context.HttpContext.Response.StatusCode = 400;
            return ValueTask.FromResult(new { Error = exception.Message });
        }
    }
}