CREATE TABLE IF NOT EXISTS user_data
(
    username     VARCHAR(255) NOT NULL,
    displayname VARCHAR(255) NOT NULL,
    email        VARCHAR(255),
    elo          INT NOT NULL,
    PRIMARY KEY (username)
);
