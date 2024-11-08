## Database Schema Documentation

This schema represents the database structure for the 12th Exam Prep platform. It's designed to support:

1. User Management
   - User accounts and authentication
   - User progress tracking

2. Exam Content Management
   - Multiple exam types (sample papers, previous year papers)
   - Different question types (MCQ, subjective, coding, etc.)
   - Comprehensive question metadata (explanations, resources)

3. Attempt Tracking
   - User attempts and scores
   - Practice vs. Test mode tracking
   - Detailed answer analysis

### Key Features

- Uses UUID for all primary keys for better distribution and security
- Implements proper foreign key constraints for data integrity
- Includes timestamp tracking for all records
- Supports multiple question types with specific metadata tables
- Includes indexes for commonly queried columns

### Main Tables

1. `users`: Stores user account information
2. `subjects`: Manages different academic subjects
3. `exams`: Contains exam metadata and configuration
4. `questions`: Stores all types of questions
5. `exam_attempts`: Tracks user attempts and scores
6. `user_answers`: Records detailed user responses

### Supporting Tables

1. `question_options`: For multiple choice questions
2. `question_answers`: Stores correct answers
3. `code_test_cases`: For programming questions
4. `question_explanations`: Detailed explanations
5. `question_resources`: Additional learning materials

### Best Practices

- Uses check constraints for enumerated types
- Implements proper indexing for performance
- Includes audit timestamps on all tables
- Follows naming conventions consistently