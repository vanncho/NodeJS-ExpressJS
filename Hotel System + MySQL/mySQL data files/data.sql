CREATE TABLE users (
id INT NOT NULL PRIMARY KEY,
username VARCHAR(50),
hashed_pass VARCHAR(250),
salt VARCHAR(250),
is_admin TINYINT
);

INSERT INTO hotelsystem.users
(id, username, hashed_pass, salt, is_admin)
VALUES
(1, 'test', '0000', '1111', 1);

INSERT INTO hotelsystem.users
(id, username, hashed_pass, salt, is_admin)
VALUES
(2, 'test2', '0000', '1111', 1);
