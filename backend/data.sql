INSERT INTO player(username, display_name, email, elo)
VALUES ('Max Mustermann', 'Maxi', 'max.mustermann@iits-consulting.de', 42),
       ('Lieschen Müller', 'Lisa', 'lieschen.mueller@iits-consulting.de', 1337);

INSERT INTO match(id, white_player_username, black_player_username, outcome, played_on)
VALUES ('11111111-58cc-4372-a567-0e02b2c3d479', 'Max Mustermann', 'Lieschen Müller', 'BLACK_WINS', '2020-10-10T13:37'),
       ('22222222-58cc-4372-a567-0e02b2c3d479', 'Lieschen Müller', 'Max Mustermann', 'WHITE_WINS', '2022-12-24T18:42');