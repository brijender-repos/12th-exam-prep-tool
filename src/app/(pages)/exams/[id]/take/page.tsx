import { use } from 'react';
import { ExamTemplate } from '@/components/ExamTemplate';
import { sampleExams } from '@/lib/sampleExams';
import { notFound } from 'next/navigation';

export default function TakeExamPage({ 
  params,
  searchParams 
}: { 
  params: { id: string },
  searchParams: { mode?: string }
}) {
  const examId = use(Promise.resolve(params.id));
  const exam = sampleExams.find(e => e.id === examId);
  const mode = (searchParams.mode === 'test' ? 'test' : 'practice') as 'practice' | 'test';

  if (!exam) {
    notFound();
  }

  return <ExamTemplate exam={exam} mode={mode} />;
}