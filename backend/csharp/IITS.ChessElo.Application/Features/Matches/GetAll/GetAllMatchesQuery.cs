namespace IITS.ChessElo.Application.Features.Matches.GetAll;

public record GetAllMatchesQuery : IRequest<List<MatchDto>>;