"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Exam, UserAnswer, ExamAttempt } from '@/lib/types';
import { QuestionComponent } from '@/components/QuestionComponent';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CountdownTimer } from '@/components/CountdownTimer';
import { ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface ExamTemplateProps {
  exam: Exam;
  mode: 'practice' | 'test' | 'review';
  attempt?: ExamAttempt;
}

export function ExamTemplate({ exam, mode, attempt }: ExamTemplateProps) {
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [viewedAnswers, setViewedAnswers] = useState<string[]>(attempt?.viewedAnswers || []);
  const router = useRouter();

  useEffect(() => {
    if (attempt) {
      const attemptAnswers = attempt.answers.reduce((acc, answer) => {
        acc[answer.questionId] = answer;
        return acc;
      }, {} as Record<string, UserAnswer>);
      setAnswers(attemptAnswers);
    }
    // In review mode, expand all questions by default
    if (mode === 'review') {
      setExpandedItems(exam.questions.map(q => q.id));
    }
  }, [attempt, exam.questions, mode]);

  const handleAnswerChange = useCallback((questionId: string, value: any) => {
    if (mode !== 'review') {
      setAnswers(prev => ({
        ...prev,
        [questionId]: { 
          questionId, 
          answer: value,
          isAnswerViewed: prev[questionId]?.isAnswerViewed || false
        },
      }));
    }
  }, [mode]);

  const handleAnswerViewed = useCallback((questionId: string) => {
    if (mode === 'practice') {
      setViewedAnswers(prev => [...prev, questionId]);
      setAnswers(prev => ({
        ...prev,
        [questionId]: {
          ...prev[questionId],
          isAnswerViewed: true
        }
      }));
    }
  }, [mode]);

  const handleSubmit = useCallback(() => {
    const examAttempt: ExamAttempt = {
      id: Date.now().toString(),
      examId: exam.id,
      userId: 'current-user-id',
      answers: Object.values(answers),
      score: 0, // Will be calculated in the scoring system
      maxScore: exam.totalMarks,
      completedAt: new Date().toISOString(),
      mode: mode as 'practice' | 'test',
      viewedAnswers: mode === 'practice' ? viewedAnswers : undefined
    };

    const attempts = JSON.parse(localStorage.getItem('examAttempts') || '[]');
    attempts.push(examAttempt);
    localStorage.setItem('examAttempts', JSON.stringify(attempts));

    router.push(`/exams/${exam.id}/result`);
  }, [answers, exam.id, exam.totalMarks, mode, router, viewedAnswers]);

  const handleExpandAll = useCallback(() => {
    setExpandedItems(exam.questions.map(q => q.id));
  }, [exam.questions]);

  const handleCollapseAll = useCallback(() => {
    setExpandedItems([]);
  }, []);

  const toggleExpand = useCallback((questionId: string) => {
    setExpandedItems(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  }, []);

  const truncateText = useCallback((text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }, []);

  return (
    <div className="container mx-auto py-8 relative">
      {mode === 'test' && <CountdownTimer initialTime={exam.duration} onTimeUp={handleSubmit} />}
      <Card>
        <CardHeader>
          <CardTitle>{exam.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exam.questions.map((question, index) => {
              const isExpanded = expandedItems.includes(question.id);
              const userAnswer = answers[question.id];
              return (
                <div key={question.id} className="border rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                    onClick={() => toggleExpand(question.id)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4 flex-grow">
                        <span className="text-sm font-medium">
                          {`${index + 1}. ${isExpanded ? question.text : truncateText(question.text, 300)}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {mode === 'review' && userAnswer?.marks !== undefined && (
                          <Badge variant={userAnswer.marks === question.marks ? "success" : "warning"}>
                            {userAnswer.marks} / {question.marks} marks
                          </Badge>
                        )}
                        {mode !== 'review' && (
                          <Badge variant="outline">
                            {question.marks} marks
                          </Badge>
                        )}
                        {isExpanded ? <ChevronUp className="flex-shrink-0" /> : <ChevronDown className="flex-shrink-0" />}
                      </div>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="p-4">
                      <QuestionComponent
                        question={question}
                        userAnswer={answers[question.id]}
                        onChange={(value) => handleAnswerChange(question.id, value)}
                        showAnswer={mode === 'review'}
                        isPracticeMode={mode === 'practice'}
                        isReviewMode={mode === 'review'}
                        hideQuestionText={true}
                        onAnswerViewed={() => handleAnswerViewed(question.id)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {mode !== 'review' && (
            <Button onClick={handleSubmit}>Submit Exam</Button>
          )}
          {mode === 'review' && (
            <Button onClick={() => router.push('/exams')}>Back to Exams</Button>
          )}
        </CardFooter>
      </Card>
      <div className="fixed bottom-4 right-4 space-x-2">
        <Button
          onClick={handleExpandAll}
          size="icon"
          variant="outline"
          className="rounded-full bg-background"
          title="Expand All"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleCollapseAll}
          size="icon"
          variant="outline"
          className="rounded-full bg-background"
          title="Collapse All"
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}