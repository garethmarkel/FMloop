DROP DATABASE IF EXISTS freelance_ai;
CREATE DATABASE IF NOT EXISTS freelance_ai;
USE freelance_ai;

CREATE TABLE person (
    person_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title VARCHAR(50) NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    passphrase VARCHAR(20) NOT NULL,
    user_rating DECIMAL(2 , 1 ) NULL,
    freelancer BOOLEAN DEFAULT FALSE,
    zipcode MEDIUMINT NOT NULL
)  ENGINE=INNODB AUTO_INCREMENT=1001;

CREATE TABLE freelancer (
    person_id INTEGER PRIMARY KEY,
    hours_available TINYINT,
    freelancing_years TINYINT,
    FOREIGN KEY (person_id)
        REFERENCES person (person_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE project (
    project_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    explanation TEXT NOT NULL,
    price DECIMAL(5 , 2 ) NOT NULL,
    due_date DATETIME NOT NULL,
    created TIMESTAMP NOT NULL,
    completion_date DATETIME NULL,
    owner_id INTEGER NOT NULL,
    contracted BOOLEAN DEFAULT FALSE,
    paid BOOLEAN DEFAULT FALSE,
    project_phase VARCHAR(20) NOT NULL,
    FOREIGN KEY (owner_id)
        REFERENCES person (person_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
)  ENGINE=INNODB AUTO_INCREMENT=2001;

CREATE TABLE document (
    document_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    doc_name VARCHAR(20) NOT NULL,
    dir VARCHAR(10) NOT NULL,
    project_id INTEGER NOT NULL,
    CONSTRAINT UNIQUE (doc_name , dir),
    FOREIGN KEY (project_id)
        REFERENCES project (project_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
)  ENGINE=INNODB AUTO_INCREMENT=3001;

CREATE TABLE bid (
    bid_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    project_id INTEGER,
    contractor_id INTEGER,
    projected_finish DATETIME NOT NULL,
    is_contract BOOLEAN DEFAULT FALSE,
    proposal TEXT NOT NULL,
    UNIQUE (project_id , contractor_id),
    FOREIGN KEY (project_id)
        REFERENCES project (project_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (contractor_id)
        REFERENCES freelancer (person_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
)  ENGINE=INNODB AUTO_INCREMENT=4001;

CREATE TABLE client_questionnaire (
    client_questionnaire_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    performance_rating DECIMAL(2 , 1 ) NOT NULL,
    comments TEXT NULL,
    bid_id INTEGER,
    FOREIGN KEY (bid_id)
        REFERENCES bid (bid_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
)  ENGINE=INNODB AUTO_INCREMENT=5001;

CREATE TABLE freelancer_questionnaire (
	freelancer_questionnaire_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    client_rating DECIMAL(2 , 1 ) NOT NULL,
    comments TEXT NULL,
    bid_id INTEGER,
    FOREIGN KEY (bid_id)
        REFERENCES bid (bid_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
)  ENGINE=INNODB AUTO_INCREMENT=6001;

CREATE TABLE thread (
    thread_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    project_id INTEGER NOT NULL,
    FOREIGN KEY (project_id)
        REFERENCES project (project_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
)  ENGINE=INNODB AUTO_INCREMENT=7001;

CREATE TABLE thread_participant (
    person_id INTEGER,
    thread_id INTEGER,
    PRIMARY KEY (person_id , thread_id),
    FOREIGN KEY (thread_id)
        REFERENCES thread (thread_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (person_id)
        REFERENCES person (person_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE message (
    message_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    sent_date TIMESTAMP NOT NULL,
    content TEXT NOT NULL,
    sender_id INTEGER NOT NULL,
    thread_id INTEGER NOT NULL,
    FOREIGN KEY (sender_id)
        REFERENCES person (person_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (thread_id)
        REFERENCES thread (thread_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
)  ENGINE=INNODB AUTO_INCREMENT=8001;

CREATE TABLE read_state (
    reader_id INTEGER,
    message_id INTEGER,
    read_date TIMESTAMP NOT NULL,
    PRIMARY KEY (reader_id , message_id),
    FOREIGN KEY (reader_id)
        REFERENCES person (person_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (message_id)
        REFERENCES message (message_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE skill (
    skill_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(20)
)  ENGINE=INNODB AUTO_INCREMENT=9001;

CREATE TABLE has_skill (
    skill_id INTEGER,
    person_id INTEGER,
    skill_level TINYINT,
    PRIMARY KEY (skill_id , person_id),
    FOREIGN KEY (person_id)
        REFERENCES person (person_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    FOREIGN KEY (skill_id)
        REFERENCES skill (skill_id)
        ON UPDATE RESTRICT ON DELETE RESTRICT
);
