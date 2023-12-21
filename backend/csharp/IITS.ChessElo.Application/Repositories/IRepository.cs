namespace IITS.ChessElo.Application.Repositories;

public interface IRepository
{
    IUnitOfWork UnitOfWork { get; }
}