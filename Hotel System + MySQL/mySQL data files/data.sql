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

CREATE TABLE hotels (
id INT NOT NULL PRIMARY KEY,
title VARCHAR(50),
description VARCHAR(250),
location VARCHAR(250),
image_url VARCHAR(250),
dateAdded DATE
);

insert into hotels(id, title, description, location, image_url, date_added)
values(1, 'Metropolitan', 'Metropolitan', 'Sofia', 'http://www.sofia-guide.com/assets/metropolitan_hotel.jpg', '2018-04-24');