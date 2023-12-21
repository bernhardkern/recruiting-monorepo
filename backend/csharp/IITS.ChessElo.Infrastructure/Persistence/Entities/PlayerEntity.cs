namespace IITS.ChessElo.Infrastructure.Persistence.Entities;

public class PlayerEntity : DataEntityBase<string>
{
    public required string DisplayName { get; set; }
    public string? Email { get; set; }
    public int Elo { get; set; }

    public ICollection<MatchEntity> WhiteMatches { get; set; } = new List<MatchEntity>();
    public ICollection<MatchEntity> BlackMatches { get; set; } = new List<MatchEntity>();
}