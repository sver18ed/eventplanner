-- Create a table to store user accounts in.
CREATE TABLE IF NOT EXISTS accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(120) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);

-- Create a table to store events in.
CREATE TABLE IF NOT EXISTS events (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	accountUsername VARCHAR(50) NOT NULL,
	description VARCHAR(30) NOT NULL,
	date DATE NOT NULL,
	CONSTRAINT FK_accountEvent FOREIGN KEY (accountUsername)
	REFERENCES accounts(username)
);

-- Create a dummy account for testing.
INSERT INTO accounts (username, password) VALUES ("admin", "admin");