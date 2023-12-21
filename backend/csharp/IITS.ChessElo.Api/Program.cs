using IITS.ChessElo.Api.Endpoints;
using IITS.ChessElo.Application.Features.Players.Create;
using IITS.ChessElo.Infrastructure.Extensions;
using IITS.ChessElo.Infrastructure.Persistence.Services;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Events;
using Serilog.Formatting.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddEnvironmentVariables();
builder.Host.UseSerilog((ctx, lc) =>
{
    if (ctx.HostingEnvironment.IsDevelopment())
        lc.WriteTo.Console();
    else
        lc.WriteTo.Console(new JsonFormatter());

    lc.MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning);
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo() { Title = "IITS Chess Elo" });
});

builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddMigrationRunner(builder.Configuration);

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<GzipCompressionProvider>();
});

builder.Services.AddMediatR(cfg => { cfg.RegisterServicesFromAssemblies(typeof(CreatePlayerHandler).Assembly); });

if (builder.Environment.IsDevelopment()) builder.Services.AddCors();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = "swagger";
});

if (builder.Environment.IsDevelopment()) app.UseCors();

app.UseSerilogRequestLogging();

app.UseHttpsRedirection();

app.MapEndpoints();

await using var asyncScope = app.Services.CreateAsyncScope();
var databaseInitializerService = asyncScope.ServiceProvider.GetRequiredService<IDatabaseInitializerService>();
await databaseInitializerService.MigrateAsync(CancellationToken.None);

app.Run();