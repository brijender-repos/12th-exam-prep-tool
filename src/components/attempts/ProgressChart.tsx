'use client';

import { ExamAttempt } from "@/lib/types";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface ProgressChartProps {
  attempts: ExamAttempt[];
}

export function ProgressChart({ attempts }: ProgressChartProps) {
  const chartData = attempts
    .map((attempt, index) => ({
      attempt: attempts.length - index,
      score: Math.round((attempt.score / attempt.maxScore) * 100 * 10) / 10,
      absoluteScore: attempt.score,
      maxScore: attempt.maxScore,
      mode: attempt.mode
    }))
    .reverse();

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis 
            dataKey="attempt"
            tick={{ fill: '#888888' }}
            tickLine={{ stroke: '#888888' }}
            label={{ 
              value: 'Attempt Number', 
              position: 'insideBottom',
              offset: -10,
              style: { fill: '#888888' }
            }}
          />
          <YAxis 
            yAxisId="left"
            domain={[0, 100]}
            tick={{ fill: '#888888' }}
            tickLine={{ stroke: '#888888' }}
            label={{ 
              value: 'Score (%)', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: '#888888' }
            }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            domain={[0, 'dataMax']}
            tick={{ fill: '#888888' }}
            tickLine={{ stroke: '#888888' }}
            label={{ 
              value: 'Absolute Score', 
              angle: 90, 
              position: 'insideRight',
              style: { fill: '#888888' }
            }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}
          />
          <Legend />
          <Bar 
            yAxisId="right"
            dataKey="absoluteScore" 
            name="Score" 
            fill="#8884d8" 
            opacity={0.3}
            radius={[4, 4, 0, 0]}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="score"
            name="Score (%)"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}