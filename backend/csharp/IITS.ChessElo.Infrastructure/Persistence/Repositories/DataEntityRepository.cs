using System.Linq.Expressions;
using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Infrastructure.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace IITS.ChessElo.Infrastructure.Persistence.Repositories;

internal class DataEntityRepository<TEntity, TId> : IEntityRepository<TEntity, TId>
    where TEntity : class, IDataEntity<TId>
    where TId : notnull
{
    private readonly DbSet<TEntity> _entities;

    /// <summary>
    /// Database context
    /// </summary>
    private readonly ApplicationDbContext _context;

    public IUnitOfWork UnitOfWork => _context;

    public void Add(TEntity entity)
    {
        Guard.IsNotNull(entity, nameof(entity));
        _entities.Add(entity);
    }

    public async ValueTask AddAsync(TEntity entity)
    {
        Guard.IsNotNull(entity, nameof(entity));
        await _entities.AddAsync(entity);
    }

    public void AddRange(IEnumerable<TEntity> entities)
    {
        _entities.AddRange(entities);
    }

    public Task AddRangeAsync(IEnumerable<TEntity> entities)
    {
        return _entities.AddRangeAsync(entities);
    }

    public void Delete(TEntity entity)
    {
        Guard.IsNotNull(entity, nameof(entity));
        _entities.Remove(entity);
    }

    public void DeleteRange(IEnumerable<TEntity> entities)
    {
        Guard.IsNotNull(entities, nameof(entities));
        _entities.RemoveRange(entities);
    }

    public bool Exists(Expression<Func<TEntity, bool>> predicate)
    {
        return _entities.Any(predicate);
    }

    public Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return _entities.AnyAsync(predicate);
    }

    public IQueryable<TEntity> GetAll()
    {
        return GetEntities().AsSplitQuery();
    }

    public Task<List<TEntity>> GetByAsync(Expression<Func<TEntity, bool>> predicate,
        CancellationToken cancellationToken)
    {
        return GetBy(predicate).ToListAsync(cancellationToken);
    }

    public IQueryable<TEntity> GetBy(Expression<Func<TEntity, bool>> predicate)
    {
        return GetEntities().Where(predicate).AsSplitQuery();
    }

    public TEntity GetFirst(Expression<Func<TEntity, bool>> predicate)
    {
        return GetEntities().First(predicate);
    }

    public Task<TEntity> GetFirstAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return GetEntities().FirstAsync(predicate);
    }

    public Task<TEntity?> GetFirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return GetEntities().FirstOrDefaultAsync(predicate);
    }

    public TEntity GetSingle(Expression<Func<TEntity, bool>> predicate)
    {
        return GetEntities().Single(predicate);
    }

    public Task<TEntity> GetSingleAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return GetEntities().SingleAsync(predicate);
    }

    public void Update(TEntity entity)
    {
        Guard.IsNotNull(entity, nameof(entity));
        _entities.Update(entity);
    }

    public void UpdateRange(IEnumerable<TEntity> entities)
    {
        Guard.IsNotNull(entities, nameof(entities));
        foreach (var entity in entities) Update(entity);
    }

    public TEntity? Find(TId id)
    {
        return _entities.Find(id);
    }

    public ValueTask<TEntity?> FindAsync(TId id)
    {
        return _entities.FindAsync(id);
    }

    public DataEntityRepository(ApplicationDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _entities = context.Set<TEntity>();
    }

    private IQueryable<TEntity> GetEntities(bool asNoTracking = true)
    {
        if (asNoTracking) return _entities.AsNoTracking();

        return _entities;
    }
}