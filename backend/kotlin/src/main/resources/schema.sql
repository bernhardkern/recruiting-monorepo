CREATE TABLE IF NOT EXISTS player
(
    username     VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    email        VARCHAR(255),
    elo          INT          NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS match
(
    id                    UUID         NOT NULL,
    white_player_username VARCHAR(255) NOT NULL,
    black_player_username VARCHAR(255) NOT NULL,
    outcome               VARCHAR(10)  NOT NULL,
    played_on             VARCHAR(29)  NOT NULL,
    PRIMARY KEY (id)
);