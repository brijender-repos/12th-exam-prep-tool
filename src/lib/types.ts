export interface Question {
  id: string;
  type: 'single' | 'multiple' | 'true_false' | 'fill_blank' | 'subjective' | 'code';
  text: string;
  options?: string[];
  answer: string | string[] | boolean;
  language?: string;
  testCases?: Array<{
    input: string;
    expectedOutput: string;
    marks: number; // Marks for each test case
  }>;
  explanation?: {
    text: string;
    readMoreUrls?: Array<{
      title: string;
      url: string;
    }>;
    videoUrls?: Array<{
      title: string;
      url: string;
    }>;
  };
  marks: number;
  rubric?: Array<{
    criteria: string;
    marks: number;
    description: string;
  }>;
}

export interface UserAnswer {
  questionId: string;
  answer: string | string[] | boolean;
  isAnswerViewed?: boolean;
  marks?: number; // Actual marks awarded
  feedback?: string; // Feedback for partial marking
}

export interface ExamAttempt {
  id: string;
  examId: string;
  userId: string;
  answers: UserAnswer[];
  score: number;
  maxScore: number;
  completedAt: string;
  mode: 'practice' | 'test';
  viewedAnswers?: string[];
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  totalMarks: number;
  duration: number;
  questions: Question[];
}