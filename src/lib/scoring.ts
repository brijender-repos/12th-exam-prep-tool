import { Question, UserAnswer } from './types';

export function calculateQuestionScore(question: Question, userAnswer: UserAnswer): { marks: number; feedback: string } {
  if (!userAnswer || !userAnswer.answer) {
    return { marks: 0, feedback: 'No answer provided' };
  }

  switch (question.type) {
    case 'single':
    case 'true_false':
    case 'fill_blank':
      return exactMatchScoring(question, userAnswer);
    
    case 'multiple':
      return multipleChoiceScoring(question, userAnswer);
    
    case 'subjective':
      return subjectiveScoring(question, userAnswer);
    
    case 'code':
      return codeScoring(question, userAnswer);
    
    default:
      return { marks: 0, feedback: 'Unknown question type' };
  }
}

function normalizeString(str: string | boolean): string {
  if (typeof str === 'boolean') {
    return str.toString().toLowerCase();
  }
  return str.toString().toLowerCase().trim().replace(/\s+/g, ' ');
}

function exactMatchScoring(question: Question, userAnswer: UserAnswer): { marks: number; feedback: string } {
  const normalizedUserAnswer = normalizeString(userAnswer.answer);
  const normalizedCorrectAnswer = normalizeString(question.answer);
  const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
  
  return {
    marks: isCorrect ? question.marks : 0,
    feedback: isCorrect ? 'Correct answer' : 'Incorrect answer'
  };
}

function multipleChoiceScoring(question: Question, userAnswer: UserAnswer): { marks: number; feedback: string } {
  const correctAnswers = (question.answer as string[]).map(ans => normalizeString(ans));
  const userAnswers = (userAnswer.answer as string[]).map(ans => normalizeString(ans));
  
  if (!Array.isArray(userAnswers)) {
    return { marks: 0, feedback: 'Invalid answer format' };
  }

  // Sort both arrays to ignore sequence
  const sortedCorrectAnswers = [...correctAnswers].sort();
  const sortedUserAnswers = [...userAnswers].sort();

  // Check if arrays have the same elements regardless of order
  const correctCount = userAnswers.filter(ans => 
    correctAnswers.some(correct => correct === ans)
  ).length;

  const incorrectCount = userAnswers.length - correctCount;
  
  // Calculate partial marks
  const marksPerOption = question.marks / correctAnswers.length;
  let marks = Math.max(0, correctCount * marksPerOption - incorrectCount * (marksPerOption / 2));
  marks = Math.round(marks * 100) / 100; // Round to 2 decimal places

  let feedback = '';
  if (marks === question.marks) {
    feedback = 'All options correctly selected';
  } else if (marks > 0) {
    feedback = `Partially correct. ${correctCount} correct and ${incorrectCount} incorrect selections`;
  } else {
    feedback = 'Incorrect selections';
  }

  return { marks, feedback };
}

function subjectiveScoring(question: Question, userAnswer: UserAnswer): { marks: number; feedback: string } {
  if (!question.rubric) {
    return {
      marks: 0,
      feedback: 'Pending manual evaluation'
    };
  }

  const answer = normalizeString(userAnswer.answer);
  const expectedAnswer = normalizeString(question.answer);
  
  const keywords = expectedAnswer.split(' ');
  const userKeywords = answer.split(' ');
  
  const matchedKeywords = keywords.filter(keyword => 
    userKeywords.includes(keyword)
  );

  const matchPercentage = matchedKeywords.length / keywords.length;
  const marks = Math.round(question.marks * matchPercentage);

  return {
    marks,
    feedback: `Matched ${Math.round(matchPercentage * 100)}% of expected keywords`
  };
}

function codeScoring(question: Question, userAnswer: UserAnswer): { marks: number; feedback: string } {
  if (!question.testCases) {
    return {
      marks: 0,
      feedback: 'No test cases available for evaluation'
    };
  }

  const code = normalizeString(userAnswer.answer);
  const expectedCode = normalizeString(question.answer);

  // Remove whitespace and comments for comparison
  const normalizeCode = (code: string) => 
    code.replace(/\s+/g, ' ')
       .replace(/#.*/g, '')
       .trim();

  const normalizedUser = normalizeCode(code);
  const normalizedExpected = normalizeCode(expectedCode);

  // Calculate similarity score
  const similarity = calculateSimilarity(normalizedUser, normalizedExpected);
  const marks = Math.round(question.marks * similarity);

  return {
    marks,
    feedback: `Code similarity: ${Math.round(similarity * 100)}%`
  };
}

function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) {
    return 1.0;
  }
  
  const costs = new Array();
  for (let i = 0; i <= longer.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= shorter.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (longer.charAt(i - 1) !== shorter.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) {
      costs[shorter.length] = lastValue;
    }
  }
  
  return (longer.length - costs[shorter.length]) / longer.length;
}