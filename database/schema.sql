-- Users table to store user information
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subjects table to store different subjects
CREATE TABLE subjects (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Exams table to store exam information
CREATE TABLE exams (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject_id UUID REFERENCES subjects(id),
    total_marks INTEGER NOT NULL,
    duration INTEGER NOT NULL, -- in seconds
    year INTEGER, -- for previous year papers
    is_sample BOOLEAN DEFAULT false,
    is_previous_year BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Questions table to store all questions
CREATE TABLE questions (
    id UUID PRIMARY KEY,
    exam_id UUID REFERENCES exams(id),
    type VARCHAR(20) NOT NULL CHECK (type IN ('single', 'multiple', 'true_false', 'fill_blank', 'subjective', 'code')),
    text TEXT NOT NULL,
    marks INTEGER NOT NULL,
    language VARCHAR(50), -- for code questions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Question options for multiple choice questions
CREATE TABLE question_options (
    id UUID PRIMARY KEY,
    question_id UUID REFERENCES questions(id),
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Question answers table
CREATE TABLE question_answers (
    id UUID PRIMARY KEY,
    question_id UUID REFERENCES questions(id),
    answer_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Test cases for code questions
CREATE TABLE code_test_cases (
    id UUID PRIMARY KEY,
    question_id UUID REFERENCES questions(id),
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    marks INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Question explanations
CREATE TABLE question_explanations (
    id UUID PRIMARY KEY,
    question_id UUID REFERENCES questions(id),
    explanation_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Additional resources for questions
CREATE TABLE question_resources (
    id UUID PRIMARY KEY,
    question_id UUID REFERENCES questions(id),
    type VARCHAR(20) NOT NULL CHECK (type IN ('video', 'article')),
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Exam attempts by users
CREATE TABLE exam_attempts (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    exam_id UUID REFERENCES exams(id),
    mode VARCHAR(20) NOT NULL CHECK (mode IN ('practice', 'test')),
    score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User answers for each question in an attempt
CREATE TABLE user_answers (
    id UUID PRIMARY KEY,
    attempt_id UUID REFERENCES exam_attempts(id),
    question_id UUID REFERENCES questions(id),
    answer TEXT NOT NULL,
    marks_obtained INTEGER,
    is_correct BOOLEAN,
    feedback TEXT,
    is_answer_viewed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sample data insertion for subjects
INSERT INTO subjects (id, name) VALUES 
    (gen_random_uuid(), 'Computer Science'),
    (gen_random_uuid(), 'Mathematics'),
    (gen_random_uuid(), 'Physics');

-- Indexes for better query performance
CREATE INDEX idx_exam_subject ON exams(subject_id);
CREATE INDEX idx_question_exam ON questions(exam_id);
CREATE INDEX idx_attempt_user ON exam_attempts(user_id);
CREATE INDEX idx_attempt_exam ON exam_attempts(exam_id);
CREATE INDEX idx_user_answer_attempt ON user_answers(attempt_id);
CREATE INDEX idx_user_answer_question ON user_answers(question_id);