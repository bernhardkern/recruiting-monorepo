using IITS.ChessElo.Application.Repositories;

namespace IITS.ChessElo.Application.Features.Matches.GetAll;

public class GetAllMatchesHandler(IMatchRepository matchRepository)
    : IRequestHandler<GetAllMatchesQuery, List<MatchDto>>
{
    public Task<List<MatchDto>> Handle(GetAllMatchesQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(matchRepository.GetAll().Select(
            s => new MatchDto(s.Id, s.WhitePlayerUserName, s.BlackPlayerUserName, (Outcome)s.Outcome, s.PlayedOn)
        ).ToList());
    }
}