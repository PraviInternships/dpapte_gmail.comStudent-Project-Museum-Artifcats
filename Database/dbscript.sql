-- Create the Artifacts table
CREATE TABLE Artifacts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    multimedia_links JSONB
);

-- Create the Quizzes table
CREATE TABLE Quizzes (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer VARCHAR(255) NOT NULL,
    artifact_id INTEGER NOT NULL,
    FOREIGN KEY (artifact_id) REFERENCES Artifacts(id)
);

-- Create the Visitors table
CREATE TABLE Visitors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    quiz_scores JSONB,
    last_interaction TIMESTAMP
);

-- Create the Admins table
CREATE TABLE Admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);

-- Create indexes
CREATE INDEX idx_quizzes_artifact_id ON Quizzes(artifact_id);
CREATE INDEX idx_visitors_email ON Visitors(email);
