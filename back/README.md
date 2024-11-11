Tablas:

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mail VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    status INT
);

CREATE TABLE Comentaries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    processId INT,
    FOREIGN KEY (processId) REFERENCES Process(id)
);

CREATE TABLE Process (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidateId INT,
    searchId INT,
    coincidence FLOAT,
    cv VARCHAR(255),
    analysys VARCHAR(255),
    FOREIGN KEY (candidateId) REFERENCES Candidate(id),
    FOREIGN KEY (searchId) REFERENCES Search(id)
);

CREATE TABLE Search (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    folder VARCHAR(255),
    status VARCHAR(255)
);

CREATE TABLE Candidate (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    status VARCHAR(255)
);

CREATE TABLE Interview (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255),
    analysys VARCHAR(255),
    date DATE,
    processId INT,
    transcription VARCHAR(255),
    FOREIGN KEY (processId) REFERENCES Process(id)
);

CREATE TABLE Notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    date DATE,
    interviewId INT,
    FOREIGN KEY (interviewId) REFERENCES Interview(id)
);

CREATE TABLE Questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255),
    searchId INT,
    FOREIGN KEY (searchId) REFERENCES Search(id)
);

CREATE TABLE Answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    answer VARCHAR(255),
    correct BOOLEAN,
    questionId INT,
    FOREIGN KEY (questionId) REFERENCES Questions(id)
);

CREATE TABLE CandidateAnswers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    processId INT,
    questionId INT,
    answerId INT,
    FOREIGN KEY (processId) REFERENCES Process(id),
    FOREIGN KEY (questionId) REFERENCES Questions(id),
    FOREIGN KEY (answerId) REFERENCES Answers(id)
);
