CREATE TABLE IF NOT EXISTS player
(
    user_name     VARCHAR(255) NOT NULL,
    display_name  VARCHAR(255) NOT NULL,
    email         VARCHAR(255),
    elo           INT NOT NULL,
    PRIMARY KEY (user_name)
);

CREATE TABLE IF NOT EXISTS match
(
    id                       UUID NOT NULL,
    white_player_user_name   VARCHAR(255) NOT NULL,
    black_player_user_name   VARCHAR(255) NOT NULL,
    outcome                  VARCHAR(10) NOT NULL,
    timestamp                LONG NOT NULL,
    PRIMARY KEY (id)
);