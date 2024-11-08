'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const ITEMS_PER_PAGE = 5;

// Mock data for previous years papers
const previousYearsPapers = [
  { 
    id: "py2023",
    title: "CBSE 2023 Final Exam",
    subject: "Computer Science",
    questions: 35,
    year: 2023,
    attemptCount: 450
  },
  { 
    id: "py2022",
    title: "CBSE 2022 Final Exam",
    subject: "Computer Science",
    questions: 30,
    year: 2022,
    attemptCount: 380
  },
  { 
    id: "py2021",
    title: "CBSE 2021 Final Exam",
    subject: "Computer Science",
    questions: 32,
    year: 2021,
    attemptCount: 290
  },
  { 
    id: "py2020",
    title: "CBSE 2020 Final Exam",
    subject: "Computer Science",
    questions: 28,
    year: 2020,
    attemptCount: 275
  }
];

export default function PreviousYearsPapers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Get unique subjects
  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(previousYearsPapers.map(paper => paper.subject))];
    return ['all', ...uniqueSubjects];
  }, []);

  // Filter and paginate papers
  const filteredAndPaginatedPapers = useMemo(() => {
    let filtered = previousYearsPapers;
    
    // Apply subject filter
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(paper => paper.subject === selectedSubject);
    }

    // Calculate pagination
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    return {
      papers: filtered.slice(startIndex, endIndex),
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
      totalItems: filtered.length
    };
  }, [currentPage, selectedSubject]);

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Previous Years Papers</CardTitle>
        <div className="w-[200px]">
          <Select value={selectedSubject} onValueChange={handleSubjectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paper Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Attempt Count</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndPaginatedPapers.papers.map((paper) => (
              <TableRow key={paper.id}>
                <TableCell>{paper.title}</TableCell>
                <TableCell>{paper.subject}</TableCell>
                <TableCell>{paper.questions}</TableCell>
                <TableCell>{paper.attemptCount}</TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/exams/${paper.id}`}>Attempt</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredAndPaginatedPapers.papers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No papers found for the selected subject
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {Math.min(ITEMS_PER_PAGE, filteredAndPaginatedPapers.totalItems)} of{' '}
            {filteredAndPaginatedPapers.totalItems} papers
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
              Page {currentPage} of {filteredAndPaginatedPapers.totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => 
                Math.min(filteredAndPaginatedPapers.totalPages, prev + 1)
              )}
              disabled={currentPage === filteredAndPaginatedPapers.totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}