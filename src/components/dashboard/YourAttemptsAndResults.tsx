'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type Attempt = {
  id: string;
  date: string;
  paperName: string;
  score: number;
};

export default function YourAttemptsAndResults() {
  const attempts: Attempt[] = [
    { id: '1', date: '2023-12-15', paperName: 'Math Sample 1', score: 85 },
    { id: '2', date: '2023-12-10', paperName: 'Physics Sample 1', score: 78 },
    { id: '3', date: '2023-12-05', paperName: 'Chemistry Sample 1', score: 92 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Attempts and Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Paper Name</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attempts.map((attempt) => (
              <TableRow key={attempt.id}>
                <TableCell>{attempt.date}</TableCell>
                <TableCell>{attempt.paperName}</TableCell>
                <TableCell>{attempt.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
