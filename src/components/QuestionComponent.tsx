"use client"

import React, { useState } from 'react';
import { Question, UserAnswer } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AnswerExplanationPanel } from './AnswerExplanationPanel';
import { CodeEditor } from './CodeEditor';

interface QuestionComponentProps {
  question: Question;
  userAnswer: UserAnswer | undefined;
  onChange: (answer: string | string[] | boolean) => void;
  showAnswer: boolean;
  isPracticeMode: boolean;
  isReviewMode: boolean;
  hideQuestionText: boolean;
  onAnswerViewed?: (questionId: string) => void;
}

export function QuestionComponent({
  question,
  userAnswer,
  onChange,
  showAnswer,
  isPracticeMode,
  isReviewMode,
  hideQuestionText,
  onAnswerViewed,
}: QuestionComponentProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(isReviewMode || (userAnswer?.isAnswerViewed ?? false));

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'single':
        return (
          <RadioGroup
            onValueChange={(value) => onChange(value)}
            value={userAnswer?.answer as string}
            disabled={isReviewMode}
          >
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                <Label htmlFor={`${question.id}-${option}`} className="text-sm">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'multiple':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${option}`}
                  checked={(userAnswer?.answer as string[] || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const currentAnswers = userAnswer?.answer as string[] || [];
                    if (checked) {
                      onChange([...currentAnswers, option]);
                    } else {
                      onChange(currentAnswers.filter((a) => a !== option));
                    }
                  }}
                  disabled={isReviewMode}
                />
                <Label htmlFor={`${question.id}-${option}`} className="text-sm">{option}</Label>
              </div>
            ))}
          </div>
        );
      case 'true_false':
        return (
          <RadioGroup
            onValueChange={(value) => onChange(value === 'true')}
            value={userAnswer?.answer?.toString()}
            disabled={isReviewMode}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id={`${question.id}-true`} />
              <Label htmlFor={`${question.id}-true`} className="text-sm">True</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id={`${question.id}-false`} />
              <Label htmlFor={`${question.id}-false`} className="text-sm">False</Label>
            </div>
          </RadioGroup>
        );
      case 'fill_blank':
        return (
          <Input
            placeholder="Type your answer here"
            value={userAnswer?.answer as string || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={isReviewMode}
            className="text-sm"
          />
        );
      case 'subjective':
        return (
          <Textarea
            placeholder="Type your answer here"
            value={userAnswer?.answer as string || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={isReviewMode}
            className="text-sm"
          />
        );
      case 'code':
        return (
          <div className="space-y-4">
            <CodeEditor
              value={userAnswer?.answer as string || ''}
              onChange={onChange}
              language={question.language || 'python'}
              disabled={isReviewMode}
            />
            {question.testCases && question.testCases.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Test Cases:</p>
                {question.testCases.map((testCase, index) => (
                  <div key={index} className="text-sm space-y-1">
                    <p><span className="font-medium">Input:</span> {testCase.input}</p>
                    <p><span className="font-medium">Expected Output:</span> {testCase.expectedOutput}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleViewAnswer = () => {
    setIsAnswerVisible(true);
    if (onAnswerViewed) {
      onAnswerViewed(question.id);
    }
  };

  const handleRetry = () => {
    setIsAnswerVisible(false);
    onChange('');
  };

  const getScoreBadgeVariant = () => {
    if (!userAnswer?.marks) return 'outline';
    const percentage = (userAnswer.marks / question.marks) * 100;
    if (percentage === 100) return 'success';
    if (percentage >= 50) return 'warning';
    return 'destructive';
  };

  return (
    <div className="space-y-4">
      {!hideQuestionText && (
        <div className="flex justify-between items-start gap-4">
          <p className="text-sm font-medium flex-grow">{question.text}</p>
          <Badge variant={getScoreBadgeVariant()} className="whitespace-nowrap">
            {userAnswer?.marks !== undefined ? `${userAnswer.marks}/${question.marks}` : `${question.marks} marks`}
          </Badge>
        </div>
      )}
      {renderQuestionInput()}
      {isPracticeMode && !isAnswerVisible && (
        <Button onClick={handleViewAnswer} size="sm">View Answer</Button>
      )}
      {isPracticeMode && isAnswerVisible && (
        <Button onClick={handleRetry} size="sm">Retry</Button>
      )}
      {(isReviewMode || isAnswerVisible) && (
        <AnswerExplanationPanel
          userAnswer={userAnswer?.answer}
          correctAnswer={question.answer}
          explanation={question.explanation}
          questionType={question.type}
          alwaysShowExplanation={isPracticeMode || isReviewMode}
        />
      )}
      {userAnswer?.feedback && (
        <div className="text-sm text-muted-foreground mt-2">
          <span className="font-medium">Feedback:</span> {userAnswer.feedback}
        </div>
      )}
    </div>
  );
}