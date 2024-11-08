"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Award, AlertCircle } from "lucide-react";
import { Exam, ExamAttempt } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCallback, useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";

interface ExamDetailsProps {
  exam: Exam;
}

export function ExamDetails({ exam }: ExamDetailsProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedAttempts = JSON.parse(localStorage.getItem('examAttempts') || '[]');
    const examAttempts = savedAttempts
      .filter((attempt: ExamAttempt) => attempt.examId === exam.id)
      .sort((a: ExamAttempt, b: ExamAttempt) => 
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
    setAttempts(examAttempts);
  }, [exam.id]);

  const handleTestModeClick = useCallback(() => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  }, []);

  const startExam = useCallback((mode: 'practice' | 'test') => {
    router.push(`/exams/${exam.id}/take?mode=${mode}`);
  }, [router, exam.id]);

  return (
    <div className="container mx-auto py-8 space-y-8">
      {showAlert && (
        <Alert className="mb-4 max-w-4xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Test mode is time-limited and answers cannot be viewed until completion.
            Make sure you have a stable internet connection before starting.
          </AlertDescription>
        </Alert>
      )}

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{exam.title}</CardTitle>
              <CardDescription className="mt-2">{exam.subject}</CardDescription>
            </div>
            <Badge variant="outline" className="text-base px-4 py-1">
              {exam.questions.length} Questions
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{exam.duration / 60} minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Marks</p>
                <p className="font-medium">{exam.totalMarks} marks</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Question Types</p>
                <p className="font-medium">Mixed Format</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Exam Overview</h3>
            <div className="prose prose-sm max-w-none">
              <p>This comprehensive exam covers various aspects of {exam.subject}. It includes:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Multiple choice questions to test conceptual understanding</li>
                <li>True/False questions for quick knowledge checks</li>
                <li>Coding problems to evaluate practical skills</li>
                <li>Subjective questions to assess in-depth knowledge</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mode Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium mb-2">Practice Mode</h4>
                <ul className="text-sm space-y-1">
                  <li>• Unlimited attempts</li>
                  <li>• Immediate feedback</li>
                  <li>• View explanations anytime</li>
                  <li>• No time limit</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <h4 className="font-medium mb-2">Test Mode</h4>
                <ul className="text-sm space-y-1">
                  <li>• Single attempt</li>
                  <li>• Timed assessment</li>
                  <li>• Results after completion</li>
                  <li>• Simulates exam environment</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-4">
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => startExam('practice')}
          >
            Practice Mode
          </Button>
          <Button 
            size="lg"
            onClick={() => {
              handleTestModeClick();
              startExam('test');
            }}
          >
            Test Mode
          </Button>
        </CardFooter>
      </Card>

      {/* Attempt History Section */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Attempt History</CardTitle>
          <CardDescription>Your previous attempts for this exam</CardDescription>
        </CardHeader>
        <CardContent>
          {attempts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attempts.map((attempt) => (
                  <TableRow key={attempt.id}>
                    <TableCell>{formatDateTime(attempt.completedAt)}</TableCell>
                    <TableCell className="capitalize">{attempt.mode}</TableCell>
                    <TableCell>{attempt.score} / {attempt.maxScore}</TableCell>
                    <TableCell>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/exams/${exam.id}/review/${attempt.id}`}>
                          Review
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No attempts yet. Start practicing or take a test to see your history here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}