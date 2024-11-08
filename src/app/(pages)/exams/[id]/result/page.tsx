"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExamAttempt, Exam } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { sampleExams } from "@/lib/sampleExams";

export default function ResultPage({ params }: { params: { id: string } }) {
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [exam, setExam] = useState<Exam | null>(null);
  const router = useRouter();

  useEffect(() => {
    const attempts = JSON.parse(localStorage.getItem('examAttempts') || '[]');
    const latestAttempt = attempts.find((a: ExamAttempt) => a.examId === params.id);
    if (latestAttempt) {
      setAttempt(latestAttempt);
    }

    const examData = sampleExams.find(e => e.id === params.id);
    if (examData) {
      setExam(examData);
    }
  }, [params.id]);

  const handleReturnToExams = () => {
    router.push('/exams');
  };

  if (!attempt || !exam) {
    return <div>Loading...</div>;
  }

  const percentage = (attempt.score / attempt.maxScore) * 100;
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A', color: 'text-green-600' };
    if (percentage >= 80) return { grade: 'B', color: 'text-blue-600' };
    if (percentage >= 70) return { grade: 'C', color: 'text-yellow-600' };
    if (percentage >= 60) return { grade: 'D', color: 'text-orange-600' };
    return { grade: 'F', color: 'text-red-600' };
  };

  const { grade, color } = getGrade(percentage);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{exam.title} - Result</CardTitle>
          <CardDescription>{exam.subject}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Your Score</h2>
              <p className="text-5xl font-bold mb-4">
                {attempt.score} / {attempt.maxScore}
              </p>
              <Progress value={percentage} className="w-full h-4 mb-4" />
              <p className="text-xl">
                Percentage: <span className="font-semibold">{percentage.toFixed(1)}%</span>
              </p>
              <p className="text-2xl mt-4">
                Grade: <span className={`font-bold ${color}`}>{grade}</span>
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Question Breakdown</h3>
              <div className="space-y-4">
                {attempt.answers.map((answer, index) => (
                  <div key={answer.questionId} className="text-left p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">Question {index + 1}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-600">
                        Marks: {answer.marks} / {exam.questions[index].marks}
                      </p>
                      {answer.feedback && (
                        <p className="text-sm text-gray-600">
                          {answer.feedback}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={handleReturnToExams}>Return to Exams</Button>
          <Button 
            variant="outline"
            onClick={() => router.push(`/exams/${params.id}/review/${attempt.id}`)}
          >
            Review Answers
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}