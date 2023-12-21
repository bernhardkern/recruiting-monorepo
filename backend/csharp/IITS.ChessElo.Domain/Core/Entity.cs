namespace IITS.ChessElo.Domain.Core;

public abstract class Entity<TId> : IEquatable<Entity<TId>>, IEntity<TId> where TId : notnull
{
    public TId Id { get; protected set; } = default!;


    public bool Equals(Entity<TId>? other)
    {
        return Equals((object?)other);
    }

    protected Entity(TId id)
    {
        Id = id;
    }

    protected Entity()
    {
    }

    public override bool Equals(object? obj)
    {
        return obj is Entity<TId> entity && Id.Equals(entity.Id);
    }

    public static bool operator ==(Entity<TId>? left, Entity<TId>? right)
    {
        return Equals(left, right);
    }

    public static bool operator !=(Entity<TId>? left, Entity<TId>? right)
    {
        return !Equals(left, right);
    }

    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }

    protected bool UpdateFieldIfChanged<TValue>(TValue newValue, TValue currentValue, Action<TValue> setNewValue)
    {
        var changed = false;

        if (!Equals(newValue, currentValue))
        {
            setNewValue(newValue);
            changed = true;
        }

        return changed;
    }
}