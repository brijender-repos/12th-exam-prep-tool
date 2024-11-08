import { use } from "react";
import { ExamTemplate } from '@/components/ExamTemplate';
import { Exam, ExamAttempt } from '@/lib/types';
import { sampleExams } from '@/lib/sampleExams';

export default function ReviewPage({ params }: { params: { id: string, attemptId: string } }) {
  const examId = use(Promise.resolve(params.id));
  const attemptId = use(Promise.resolve(params.attemptId));
  
  const exam = sampleExams.find(e => e.id === examId);
  const attempts = JSON.parse(localStorage.getItem('examAttempts') || '[]');
  const attempt = attempts.find((a: ExamAttempt) => a.id === attemptId);

  if (!attempt || !exam) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Review not found</p>
      </div>
    );
  }

  return <ExamTemplate exam={exam} mode="review" attempt={attempt} />;
}