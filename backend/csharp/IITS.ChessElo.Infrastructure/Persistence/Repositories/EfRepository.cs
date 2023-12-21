using System.Linq.Expressions;
using AutoMapper;
using IITS.ChessElo.Application.Repositories;
using IITS.ChessElo.Domain.Core;
using IITS.ChessElo.Infrastructure.Persistence.Entities;

namespace IITS.ChessElo.Infrastructure.Persistence.Repositories;

public abstract class EfRepository<TAggregateRoot, TDataEntity, TId> : IQueryableRepository,
    IAggregateRepository<TAggregateRoot, TId>
    where TAggregateRoot : AggregateRoot<TId>
    where TDataEntity : IDataEntity<TId>
    where TId : notnull
{
    protected IEntityRepository<TDataEntity, TId> PersistenceRepo { get; }
    protected IMapper Mapper { get; }

    public IUnitOfWork UnitOfWork => PersistenceRepo.UnitOfWork;

    protected EfRepository(IMapper mapper, IEntityRepository<TDataEntity, TId> persistenceRepo)
    {
        Mapper = mapper;
        PersistenceRepo = persistenceRepo;
    }

    public virtual void Add(TAggregateRoot entity)
    {
        Guard.IsNotNull(entity, nameof(entity));

        var dataEntity = Mapper.Map<TDataEntity>(entity);
        PersistenceRepo.Add(dataEntity);
    }

    public virtual async ValueTask AddAsync(TAggregateRoot entity)
    {
        Guard.IsNotNull(entity, nameof(entity));

        var dataEntity = Mapper.Map<TDataEntity>(entity);
        await PersistenceRepo.AddAsync(dataEntity);
    }

    public virtual void AddRange(IEnumerable<TAggregateRoot> entities)
    {
        var dataEntities = Mapper.Map<IEnumerable<TDataEntity>>(entities);
        PersistenceRepo.AddRange(dataEntities);
    }

    public Task AddRangeAsync(IEnumerable<TAggregateRoot> entities)
    {
        var dataEntities = Mapper.Map<IEnumerable<TDataEntity>>(entities);
        return PersistenceRepo.AddRangeAsync(dataEntities);
    }

    public virtual void Delete(TAggregateRoot entity)
    {
        Guard.IsNotNull(entity, nameof(entity));

        var dataEntity = Mapper.Map<TDataEntity>(entity);
        PersistenceRepo.Delete(dataEntity);
    }

    public virtual void DeleteRange(IEnumerable<TAggregateRoot> entities)
    {
        Guard.IsNotNull(entities, nameof(entities));

        var dataEntities = Mapper.Map<IEnumerable<TDataEntity>>(entities);
        PersistenceRepo.DeleteRange(dataEntities);
    }

    public virtual bool Exists(Expression<Func<TAggregateRoot, bool>> predicate)
    {
        var expression = Mapper.Map<Expression<Func<TDataEntity, bool>>>(predicate);
        return PersistenceRepo.Exists(expression);
    }

    public virtual Task<bool> ExistsAsync(Expression<Func<TAggregateRoot, bool>> predicate)
    {
        var expression = Mapper.Map<Expression<Func<TDataEntity, bool>>>(predicate);
        return PersistenceRepo.ExistsAsync(expression);
    }

    public virtual IQueryable<TAggregateRoot> GetAll()
    {
        return Mapper.ProjectTo<TAggregateRoot>(PersistenceRepo.GetAll());
    }

    public virtual IQueryable<TAggregateRoot> GetBy(Expression<Func<TAggregateRoot, bool>> predicate)
    {
        var expression = Mapper.Map<Expression<Func<TDataEntity, bool>>>(predicate);
        return Mapper.ProjectTo<TAggregateRoot>(PersistenceRepo.GetBy(expression));
    }

    public async Task<List<TAggregateRoot>> GetByAsync(Expression<Func<TAggregateRoot, bool>> predicate,
        CancellationToken cancellationToken)
    {
        var expression = Mapper.Map<Expression<Func<TDataEntity, bool>>>(predicate);
        var entities = await PersistenceRepo.GetByAsync(expression, cancellationToken);
        return Mapper.Map<List<TAggregateRoot>>(entities);
    }

    public virtual TAggregateRoot GetFirst(Expression<Func<TAggregateRoot, bool>> predicate)
    {
        var expression = Mapper.Map<Expression<Func<TDataEntity, bool>>>(predicate);
        return Mapper.Map<TAggregateRoot>(PersistenceRepo.GetFirst(expression));
    }

    public virtual async Task<TAggregateRoot> GetFirstAsync(Expression<Func<TAggregateRoot, bool>> predicate)
    {
        var expression = Mapper.Map<Expression<Func<TDataEntity, bool>>>(predicate);
        var first = await PersistenceRepo.GetFirstAsync(expression);
        return Mapper.Map<TAggregateRoot>(first);
    }

    public virtual async Task<TAggregateRoot?> GetFirstOrDefaultAsync(Expression<Func<TAggregateRoot, bool>> predicate)
    {
        var expression = Mapper.Map<Expression<Func<TDataEntity, bool>>>(predicate);
        var first = await PersistenceRepo.GetFirstOrDefaultAsync(expression);
        return Mapper.Map<TAggregateRoot?>(first);
    }

    public virtual TAggregateRoot GetSingle(Expression<Func<TAggregateRoot, bool>> predicate)
    {
        var expression = Mapper.Map<Expression<Func<TDataEntity, bool>>>(predicate);
        return Mapper.Map<TAggregateRoot>(PersistenceRepo.GetSingle(expression));
    }

    public virtual async Task<TAggregateRoot> GetSingleAsync(Expression<Func<TAggregateRoot, bool>> predicate)
    {
        var expression = Mapper.Map<Expression<Func<TDataEntity, bool>>>(predicate);
        return Mapper.Map<TAggregateRoot>(await PersistenceRepo.GetSingleAsync(expression));
    }

    public virtual void Update(TAggregateRoot entity)
    {
        Guard.IsNotNull(entity, nameof(entity));

        var originalEntity = PersistenceRepo.Find(entity.Id);
        var updatedEntity = Mapper.Map(entity, originalEntity);
        PersistenceRepo.Update(updatedEntity!);
    }

    public virtual void UpdateRange(IEnumerable<TAggregateRoot> entities)
    {
        var aggregateRoots = entities as TAggregateRoot[] ?? entities.ToArray();
        Guard.IsNotNull(aggregateRoots, nameof(entities));

        foreach (var entity in aggregateRoots) Update(entity);
    }

    public TAggregateRoot Find(TId id)
    {
        return Mapper.Map<TAggregateRoot>(PersistenceRepo.Find(id));
    }

    public async ValueTask<TAggregateRoot?> FindAsync(TId id)
    {
        var result = await PersistenceRepo.FindAsync(id);
        if (result == null) return null;

        return Mapper.Map<TAggregateRoot>(result);
    }

    public virtual IQueryable<TDto> GetAll<TDto>()
    {
        return Mapper.ProjectTo<TDto>(PersistenceRepo.GetAll());
    }

    public virtual IQueryable<TDto> GetBy<TDto>(Expression<Func<TDto, bool>> predicate)
    {
        var expression = Mapper.Map<Expression<Func<TDataEntity, bool>>>(predicate);
        return Mapper.ProjectTo<TDto>(PersistenceRepo.GetBy(expression));
    }


    public virtual async Task UpdateAsync(TAggregateRoot entity)
    {
        Guard.IsNotNull(entity, nameof(entity));

        var originalEntity = await PersistenceRepo.FindAsync(entity.Id);
        var updatedEntity = Mapper.Map(entity, originalEntity);
        PersistenceRepo.Update(updatedEntity!);
    }
}