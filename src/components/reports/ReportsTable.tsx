{/* Same content as previous attempts/AttemptsTable.tsx, just renamed */}
'use client';

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExamAttempt } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { sampleExams } from "@/lib/sampleExams";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReportsTableProps {
  attempts: ExamAttempt[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ITEMS_PER_PAGE = 5;

export function ReportsTable({ attempts, currentPage, onPageChange }: ReportsTableProps) {
  const getExamTitle = (examId: string) => {
    const exam = sampleExams.find(e => e.id === examId);
    return exam?.title || 'Unknown Exam';
  };

  const getScoreBadgeVariant = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'success';
    if (percentage >= 70) return 'warning';
    return 'destructive';
  };

  const totalPages = Math.ceil(attempts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAttempts = attempts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Attempt #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Exam</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedAttempts.map((attempt, index) => (
            <TableRow key={attempt.id}>
              <TableCell>{attempts.length - (startIndex + index)}</TableCell>
              <TableCell>{formatDateTime(attempt.completedAt)}</TableCell>
              <TableCell>{getExamTitle(attempt.examId)}</TableCell>
              <TableCell className="capitalize">{attempt.mode}</TableCell>
              <TableCell>
                <Badge variant={getScoreBadgeVariant(attempt.score, attempt.maxScore)}>
                  {attempt.score} / {attempt.maxScore}
                </Badge>
              </TableCell>
              <TableCell>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/exams/${attempt.examId}/review/${attempt.id}`}>
                    Review
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {attempts.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No attempts found. Start practicing to see your results here!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {attempts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, attempts.length)} of {attempts.length} attempts
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}