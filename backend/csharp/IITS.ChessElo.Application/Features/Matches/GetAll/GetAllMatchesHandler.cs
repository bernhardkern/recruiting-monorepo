using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Matches;

namespace IITS.ChessElo.Application.Features.Matches.GetAll;

public class GetAllMatchesHandler(IMatchRepository matchRepository)
    : IRequestHandler<GetAllMatchesQuery, List<MatchDto>>
{
    public Task<List<MatchDto>> Handle(GetAllMatchesQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(matchRepository.GetAll().Select(
            s =>
                new MatchDto(s.Id, s.WhitePlayerUsername, s.BlackPlayerUsername,
                    s.Outcome == MatchOutcome.BlackWin ? Outcome.BlackWin :
                    s.Outcome == MatchOutcome.WhiteWin ? Outcome.WhiteWin : Outcome.Draw, s.PlayedOn)
        ).ToList());
    }
}