"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ExplanationDialog } from "./ExplanationDialog"
import { Check, X, BookOpen } from "lucide-react"
import { CodeEditor } from "./CodeEditor"

interface AnswerExplanationPanelProps {
  userAnswer: any
  correctAnswer: any
  explanation?: {
    text: string
    readMoreUrls?: Array<{
      title: string;
      url: string;
    }>;
    videoUrls?: Array<{
      title: string;
      url: string;
    }>;
  }
  questionType: 'single' | 'multiple' | 'true_false' | 'fill_blank' | 'subjective' | 'code'
  alwaysShowExplanation?: boolean
}

export function AnswerExplanationPanel({
  userAnswer,
  correctAnswer,
  explanation,
  questionType,
  alwaysShowExplanation = false
}: AnswerExplanationPanelProps) {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)

  const isCorrect = (): boolean => {
    if (questionType === 'subjective' || questionType === 'code') return false
    if (userAnswer === undefined || userAnswer === null || userAnswer === '') return false
    return JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)
  }

  const formatAnswer = (answer: any): string => {
    if (Array.isArray(answer)) {
      return answer.join(', ')
    }
    if (typeof answer === 'boolean') {
      return answer ? 'True' : 'False'
    }
    return String(answer)
  }

  const hasAnswer = userAnswer !== undefined && userAnswer !== null && userAnswer !== ''
  const hasDetailedExplanation = explanation?.readMoreUrls?.length || explanation?.videoUrls?.length

  const renderAnswer = (answer: any, isUserAnswer: boolean) => {
    if (questionType === 'code') {
      return (
        <div className="space-y-2">
          <span className="font-medium text-sm">{isUserAnswer ? "Your Answer:" : "Correct Answer:"}</span>
          <CodeEditor
            value={isUserAnswer ? (answer || '') : correctAnswer}
            onChange={() => {}}
            language="python"
            disabled={true}
          />
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm">{isUserAnswer ? "Your Answer:" : "Correct Answer:"}</span>
        <span className={cn(
          "text-sm flex items-center gap-2",
          isUserAnswer ? (
            hasAnswer ? (
              isCorrect() ? "text-green-700" : "text-red-700"
            ) : "text-gray-500 italic"
          ) : "text-green-700"
        )}>
          {isUserAnswer ? (
            hasAnswer ? formatAnswer(answer) : "Not answered"
          ) : (
            formatAnswer(correctAnswer)
          )}
          {isUserAnswer && hasAnswer && (
            isCorrect() ? 
              <Check className="h-4 w-4 text-green-600" /> : 
              <X className="h-4 w-4 text-red-600" />
          )}
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="mt-4 rounded-lg overflow-hidden border">
        <div className={cn(
          "p-4",
          hasAnswer ? (
            isCorrect() 
              ? "bg-green-50 border-b border-green-100" 
              : "bg-red-50 border-b border-red-100"
          ) : "bg-gray-50 border-b border-gray-100"
        )}>
          <div className="space-y-4">
            {renderAnswer(userAnswer, true)}
            {renderAnswer(correctAnswer, false)}
          </div>
        </div>

        {/* Always show explanation section */}
        <div className="p-4 bg-blue-50">
          <div className="space-y-4">
            {explanation?.text && (
              <div className="space-y-2">
                <p className="font-medium text-sm text-blue-900">Explanation:</p>
                <p className="text-sm text-blue-800 whitespace-pre-wrap">{explanation.text}</p>
              </div>
            )}

            {hasDetailedExplanation && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white"
                  onClick={() => setIsExplanationOpen(true)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Additional Resources
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {explanation && (
        <ExplanationDialog
          isOpen={isExplanationOpen}
          onClose={() => setIsExplanationOpen(false)}
          content={explanation}
        />
      )}
    </>
  )
}