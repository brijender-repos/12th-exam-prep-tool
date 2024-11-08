'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExamAttempt } from "@/lib/types";
import { Award, Target, Clock } from 'lucide-react';

interface StatCardsProps {
  attempts: ExamAttempt[];
}

export function StatCards({ attempts }: StatCardsProps) {
  const totalAttempts = attempts.length;
  const averageScore = attempts.length > 0
    ? attempts.reduce((acc, curr) => acc + (curr.score / curr.maxScore) * 100, 0) / attempts.length
    : 0;
  const bestScore = attempts.length > 0
    ? Math.max(...attempts.map(a => (a.score / a.maxScore) * 100))
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Target className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Attempts</p>
              <h2 className="text-3xl font-bold">{totalAttempts}</h2>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Clock className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Score</p>
              <h2 className="text-3xl font-bold">{averageScore.toFixed(1)}%</h2>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Award className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Best Score</p>
              <h2 className="text-3xl font-bold">{bestScore.toFixed(1)}%</h2>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}