'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExamAttempt } from "@/lib/types";
import { ReportsTable } from "@/components/reports/ReportsTable";
import { ProgressChart } from "@/components/reports/ProgressChart";
import { StatCards } from "@/components/reports/StatCards";
import { SubjectFilter } from "@/components/reports/SubjectFilter";
import { sampleExams } from "@/lib/sampleExams";

export default function ReportsPage() {
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedAttempts = JSON.parse(localStorage.getItem('examAttempts') || '[]');
    setAttempts(savedAttempts.sort((a: ExamAttempt, b: ExamAttempt) => 
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    ));
  }, []);

  const filteredAttempts = selectedSubject === 'all' 
    ? attempts 
    : attempts.filter(attempt => {
        const exam = sampleExams.find(e => e.id === attempt.examId);
        return exam?.subject === selectedSubject;
      });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Progress Report</h1>
      
      {/* Stats Cards */}
      <StatCards attempts={filteredAttempts} />

      {/* Progress Chart */}
      <div className="mt-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Performance Overview</CardTitle>
            <SubjectFilter
              selectedSubject={selectedSubject}
              onSubjectChange={(value) => {
                setSelectedSubject(value);
                setCurrentPage(1);
              }}
            />
          </CardHeader>
          <CardContent>
            <ProgressChart attempts={filteredAttempts} />
          </CardContent>
        </Card>

        {/* Attempts History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Attempt History</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportsTable 
              attempts={filteredAttempts}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}