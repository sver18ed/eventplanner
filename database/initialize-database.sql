-- Create a table to store user accounts in.
CREATE TABLE IF NOT EXISTS accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	firstname VARCHAR(50) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
	password VARCHAR(120) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);

-- Create a table to store events in.
CREATE TABLE IF NOT EXISTS events (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	host VARCHAR(50) NOT NULL,
	description VARCHAR(30) NOT NULL,
	date DATE NOT NULL,
	CONSTRAINT FK_account FOREIGN KEY (host)
	REFERENCES accounts(username)
);

-- Create a table to store attendants to an event in.
CREATE TABLE IF NOT EXISTS attendants (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	eventId INT UNSIGNED NOT NULL,
	attendant VARCHAR(50) NOT NULL,
	CONSTRAINT FK_event FOREIGN KEY (eventId)
	REFERENCES events(id)
);

-- Create a dummy account for testing.
INSERT INTO accounts (username, firstname, lastname, password) VALUES ("admin", "admin", "admin", "admin");