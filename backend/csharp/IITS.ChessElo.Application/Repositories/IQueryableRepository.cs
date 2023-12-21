using System.Linq.Expressions;

namespace IITS.ChessElo.Application.Repositories;

public interface IQueryableRepository
{
    /// <summary>
    /// Retrieves all entities from the data store as <see cref="IQueryable{TDto}"/>
    /// </summary>
    /// <returns>Query</returns>
    IQueryable<TDto> GetAll<TDto>();

    /// <summary>
    /// Retrieves all entities that satisfy the given condition from the data store as <see cref="IQueryable{TDto}"/> 
    /// </summary>
    /// <param name="predicate">Condition</param>
    /// <returns>Query</returns>
    IQueryable<TDto> GetBy<TDto>(Expression<Func<TDto, bool>> predicate);
}