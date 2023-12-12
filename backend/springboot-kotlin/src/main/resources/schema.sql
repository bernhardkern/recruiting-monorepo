CREATE TABLE IF NOT EXISTS user_data
(
    username     VARCHAR(255) NOT NULL,
    displayname  VARCHAR(255) NOT NULL,
    email        VARCHAR(255),
    elo          INT NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS match
(
    id                      UUID NOT NULL,
    white_player_username   VARCHAR(255) NOT NULL,
    black_player_username   VARCHAR(255) NOT NULL,
    outcome                 VARCHAR(10) NOT NULL,
    timestamp               LONG NOT NULL,
    PRIMARY KEY (id)
    );