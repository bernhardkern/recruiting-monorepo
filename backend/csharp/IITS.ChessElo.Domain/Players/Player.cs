namespace IITS.ChessElo.Domain.Players;

public class Player : AggregateRoot<string>
{
    public string UserName { get; private set; }
    public string DisplayName { get; private set; }
    public string? Email { get; private set; }
    public int Elo { get; private set; }


#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    private Player()
    {
    }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.


    public Player(string userName, string displayName, string? email, int elo = 1000) : base(userName)
    {
        UserName = userName.Trim();
        DisplayName = displayName;
        Email = email;
        Elo = elo;
    }

    public bool UpdateDisplayName(string displayName)
    {
        return UpdateFieldIfChanged(displayName, DisplayName, x => DisplayName = x);
    }

    public bool UpdateEmail(string? email)
    {
        return UpdateFieldIfChanged(email, Email, x => Email = x);
    }
}