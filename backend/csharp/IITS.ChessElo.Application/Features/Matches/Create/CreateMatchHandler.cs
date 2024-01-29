using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Core.Exceptions;
using IITS.ChessElo.Domain.Matches;

namespace IITS.ChessElo.Application.Features.Matches.Create;

public class CreateMatchHandler(IMatchRepository matchRepository) : IRequestHandler<CreateMatchCommand, Guid>
{
    public async Task<Guid> Handle(CreateMatchCommand request, CancellationToken cancellationToken)
    {
        var matchOutcome = GetMatchOutcome();

        var match = new Match(Guid.NewGuid(), request.WhitePlayerUserName, request.BlackPlayerUserName, matchOutcome,
            DateTimeOffset.UtcNow);

        await matchRepository.AddAsync(match);
        await matchRepository.UnitOfWork.SaveChangesAsync(cancellationToken);

        return match.Id;

        MatchOutcome GetMatchOutcome()
        {
            switch (request.Outcome)
            {
                case Outcome.Draw:
                    return MatchOutcome.Draw;
                case Outcome.WhiteWin:
                    return MatchOutcome.WhiteWin;
                case Outcome.BlackWin:
                    return MatchOutcome.BlackWin;
            }

            throw new ValidationException("The outcome of the match is invalid.");
        }
    }
}