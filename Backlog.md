# UseCases

## Use Case 1: Unique user names

When a user with the same user name is created a appropriate error should be returned

- The error should be a 400
- The error should be a json object with the following format:

```json
{
    "error": "User name already exists"
}
```

- The error should be returned when a user is created with a user name that already exists

## Use Case 2: Elo calculations

When a match is created the elo of the players should be updated.

- The elo of the winner should be increased
- The elo of the loser should be decreased
- The increase/decrease should be based on the difference in elo between the players
- There is a maximum elo change of 42
- The maximum is used when the difference in elo is greater than 200

## Use Case 3: Query match history

When a user requests their match history the server should return the appropriate data

- Data should include:
    - Opponent
    - Outcome
    - Date
    - Elo change
- The data should be sorted by date
- The data should be limited to the last 10 matches

## Use Case 4: Query user stats

When a user requests their stats the server should return the appropriate data.

- Data should include:
    - Total wins
    - Total losses
    - Total draws
    - Total games played
    - Win percentage
    - Elo
    - Rank

## Use Case 5: Query leaderboard

When a user requests the leaderboard the server should return the appropriate data.#

- Data should include:
    - User name
    - Rank
    - Elo
    - Win percentage

## Use Case 6: Matchmaking

The match making algorithm should be based on elo and should try to match players with similar elo.
When a user requests a match the server should return the appropriate data.

- Data should include:
    - Opponent
    - Elo
    - Rank


// aufgabe: username veränderbar -> ID
// aufgabe: match zeitpunkt mitschicken
// aufgabe: implement easy elo algorithm triggered at win/lose

TODO: Bewerber mitteilen:
Neueste Docker Version
Backend: Java 21/?
Frontend: ?

