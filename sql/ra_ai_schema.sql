DROP DATABASE IF EXISTS ra_ai;
CREATE DATABASE IF NOT EXISTS ra_ai;
USE ra_ai;

CREATE TABLE person
(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title VARCHAR(30) NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    passphrase VARCHAR(20) NOT NULL,
    user_rating DECIMAL(2, 1) NULL
) ENGINE=InnoDB AUTO_INCREMENT = 1001;

CREATE TABLE project
(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    explanation TEXT NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    due_date DATETIME NOT NULL,
    created TIMESTAMP NOT NULL,
    owner_id INTEGER,
    FOREIGN KEY (owner_id) REFERENCES person (id)
		ON UPDATE RESTRICT ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT = 2001;

CREATE TABLE document
(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    doc_name VARCHAR(20) NOT NULL,
    dir VARCHAR(10) NOT NULL,
    project_id INTEGER,
    CONSTRAINT UNIQUE (doc_name, dir),
    FOREIGN KEY (project_id) REFERENCES project (id)
		ON UPDATE RESTRICT ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT = 3001;

CREATE TABLE contract
(
	project_id INTEGER,
    contractor_id INTEGER,
    completion_date TIMESTAMP NULL,
    performance_rating DECIMAL(2, 1) NULL,
    PRIMARY KEY (project_id, contractor_id),
    FOREIGN KEY (project_id) REFERENCES project (id)
		ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY (contractor_id) REFERENCES person (id)
		ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE thread
(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    project_id INTEGER,
    FOREIGN KEY (project_id) REFERENCES project (id)
		ON UPDATE RESTRICT ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT = 4001;

CREATE TABLE thread_participant
(
	person_id INTEGER,
    thread_id INTEGER,
    PRIMARY KEY (person_id, thread_id),
    FOREIGN KEY (thread_id) REFERENCES thread (id)
		ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY (person_id) REFERENCES person (id)
		ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE message
(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    sent_date TIMESTAMP NOT NULL,
    content TEXT NOT NULL,
    sender_id INTEGER,
    thread_id INTEGER,
    FOREIGN KEY (sender_id) REFERENCES person (id)
		ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY (thread_id) REFERENCES thread (id)
		ON UPDATE RESTRICT ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT = 5001;

CREATE TABLE read_state
(
	reader_id INTEGER,
    message_id INTEGER,
    read_date TIMESTAMP NOT NULL,
    PRIMARY KEY(reader_id, message_id),
    FOREIGN KEY (reader_id) REFERENCES person (id)
		ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY (message_id) REFERENCES message (id)
		ON UPDATE RESTRICT ON DELETE RESTRICT
);