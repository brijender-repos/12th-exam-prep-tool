'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExamAttempt } from "@/lib/types";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';
import { sampleExams } from "@/lib/sampleExams";

interface SubjectWiseProgressProps {
  attempts: ExamAttempt[];
}

export function SubjectWiseProgress({ attempts }: SubjectWiseProgressProps) {
  // Get all unique subjects
  const subjects = [...new Set(sampleExams.map(exam => exam.subject))];

  // Calculate average score per subject
  const subjectData = subjects.map(subject => {
    const subjectAttempts = attempts.filter(attempt => {
      const exam = sampleExams.find(e => e.id === attempt.examId);
      return exam?.subject === subject;
    });

    const averageScore = subjectAttempts.length > 0
      ? subjectAttempts.reduce((acc, curr) => acc + (curr.score / curr.maxScore) * 100, 0) / subjectAttempts.length
      : 0;

    return {
      subject,
      score: Math.round(averageScore * 10) / 10,
      attempts: subjectAttempts.length
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject-wise Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Score (%)"
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}