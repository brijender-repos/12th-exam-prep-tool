'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export type ProgressData = {
  date: string;
  score: number;
};

export default function ProgressChart() {
  const progressData: ProgressData[] = [
    { date: '2023-11-01', score: 65 },
    { date: '2023-11-15', score: 72 },
    { date: '2023-12-01', score: 78 },
    { date: '2023-12-15', score: 85 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <RechartsLineChart data={progressData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type='monotone' dataKey='score' stroke='#8884d8' />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
