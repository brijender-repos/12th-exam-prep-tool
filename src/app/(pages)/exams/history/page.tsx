"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExamAttempt } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = 10;

// Mock function to get exam title (replace with actual API call in production)
const getExamTitle = (examId: string): string => {
  const exams: Record<string, string> = {
    "1": "Python Language Test",
    "2": "SQL Fundamentals Test",
    "3": "Basic Networking Concepts Test",
  };
  return exams[examId] || "Unknown Exam";
};

export default function HistoryPage() {
  const [attempts, setAttempts] = useState<(ExamAttempt & { examTitle: string })[]>([]);
  const [deleteAttemptId, setDeleteAttemptId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterExamTitle, setFilterExamTitle] = useState("");
  const [filterMode, setFilterMode] = useState<string>("all");
  const [uniqueExamTitles, setUniqueExamTitles] = useState<string[]>([]);

  useEffect(() => {
    const savedAttempts = JSON.parse(localStorage.getItem('examAttempts') || '[]');
    const attemptsWithTitles = savedAttempts
      .map((attempt: ExamAttempt) => ({
        ...attempt,
        examTitle: getExamTitle(attempt.examId)
      }))
      .sort((a: ExamAttempt, b: ExamAttempt) => 
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );

    setAttempts(attemptsWithTitles);
    
    // Extract unique exam titles
    const titles = [...new Set(attemptsWithTitles.map(a => a.examTitle))];
    setUniqueExamTitles(titles);
  }, []);

  const handleDelete = (attemptId: string) => {
    setDeleteAttemptId(attemptId);
  };

  const confirmDelete = () => {
    if (deleteAttemptId) {
      const updatedAttempts = attempts.filter(attempt => attempt.id !== deleteAttemptId);
      setAttempts(updatedAttempts);
      localStorage.setItem('examAttempts', JSON.stringify(updatedAttempts));
      setDeleteAttemptId(null);
    }
  };

  // Filter attempts based on search criteria
  const filteredAttempts = attempts.filter(attempt => {
    const matchesTitle = filterExamTitle 
      ? attempt.examTitle.toLowerCase().includes(filterExamTitle.toLowerCase())
      : true;
    const matchesMode = filterMode === "all" 
      ? true 
      : attempt.mode === filterMode;
    return matchesTitle && matchesMode;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAttempts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAttempts = filteredAttempts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Exam Attempt History</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1">
              <Input
                placeholder="Filter by exam title..."
                value={filterExamTitle}
                onChange={(e) => {
                  setFilterExamTitle(e.target.value);
                  setCurrentPage(1);
                }}
                className="max-w-xs"
              />
            </div>
            <div className="w-[200px]">
              <Select
                value={filterMode}
                onValueChange={(value) => {
                  setFilterMode(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="practice">Practice</SelectItem>
                  <SelectItem value="test">Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam Title</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Completed At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAttempts.map((attempt) => (
                <TableRow key={attempt.id}>
                  <TableCell>{attempt.examTitle}</TableCell>
                  <TableCell className="capitalize">{attempt.mode}</TableCell>
                  <TableCell>{attempt.score} / {attempt.maxScore}</TableCell>
                  <TableCell>{formatDateTime(attempt.completedAt)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/exams/${attempt.examId}/review/${attempt.id}`}>
                          Review
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(attempt.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              exam attempt record.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredAttempts.length)} of {filteredAttempts.length} results
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}