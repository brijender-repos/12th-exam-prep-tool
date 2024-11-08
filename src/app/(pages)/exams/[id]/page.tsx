import { use } from 'react';
import { ExamDetails } from '@/components/exam/ExamDetails';
import { sampleExams } from '@/lib/sampleExams';
import { notFound } from 'next/navigation';

export default function ExamPage({ params }: { params: { id: string } }) {
  const examId = use(Promise.resolve(params.id));
  const exam = sampleExams.find(e => e.id === examId);

  if (!exam) {
    notFound();
  }

  return <ExamDetails exam={exam} />;
}