'use client';

import React, { useState } from 'react';
import {
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Home,
  LineChart,
  Search,
  Settings,
  Users,
  Database,
  Tag,
  Zap,
  FileText,
  Gauge,
  PlayCircle,
} from 'lucide-react';
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
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export type NavItemProps = {
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
};

export type PreviousYearPaper = {
  year: number;
  attemptCount: number;
};

export type SamplePaper = {
  id: string;
  name: string;
  attemptCount: number;
};

export type Attempt = {
  id: string;
  date: string;
  paperName: string;
  score: number;
};

export type ProgressData = {
  date: string;
  score: number;
};

export type DashboardProps = {
  previousYearsPapers: PreviousYearPaper[];
  samplePapers: SamplePaper[];
  attempts: Attempt[];
  progressData: ProgressData[];
};

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isOpen }) => (
  <a
    href='#'
    className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'
  >
    <Icon size={20} />
    <span
      className={`ml-4 text-sm transition-all duration-300 ${
        isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
      }`}
    >
      {label}
    </span>
  </a>
);

const PreviousYearsPapers: React.FC<{ papers: PreviousYearPaper[] }> = ({
  papers,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Previous Years Papers</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Attempt Count</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {papers.map((paper) => (
            <TableRow key={paper.year}>
              <TableCell>{paper.year}</TableCell>
              <TableCell>{paper.attemptCount}</TableCell>
              <TableCell>
                <Button variant='outline'>Attempt</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const SampleQuestionPapers: React.FC<{ papers: SamplePaper[] }> = ({
  papers,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Sample Question Papers</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paper Name</TableHead>
            <TableHead>Attempt Count</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {papers.map((paper) => (
            <TableRow key={paper.id}>
              <TableCell>{paper.name}</TableCell>
              <TableCell>{paper.attemptCount}</TableCell>
              <TableCell>
                <Button variant='outline'>Attempt</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const YourAttemptsAndResults: React.FC<{ attempts: Attempt[] }> = ({
  attempts,
}) => (
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

const ProgressChart: React.FC<{ data: ProgressData[] }> = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Your Progress</CardTitle>
    </CardHeader>
    <CardContent>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <RechartsLineChart data={data}>
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

export function DashboardClient({
  previousYearsPapers,
  samplePapers,
  attempts,
  progressData,
}: DashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* PromptLayer-style Left Navigation Pane */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col fixed h-full overflow-hidden`}
      >
        <div className='flex items-center justify-between p-4 border-b'>
          <h1
            className={`text-xl font-bold transition-opacity duration-300 ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
            }`}
          >
            EduTech
          </h1>
          <button
            onClick={toggleSidebar}
            className='p-2 rounded-full hover:bg-gray-200 absolute right-2 top-4'
          >
            {isSidebarOpen ? (
              <ChevronLeft size={24} />
            ) : (
              <ChevronRight size={24} />
            )}
          </button>
        </div>
        <div className='p-4'>
          <div className='flex items-center bg-gray-100 rounded-md'>
            <Search className='ml-3 text-gray-400' size={20} />
            <input
              type='text'
              placeholder='Search...'
              className={`w-full p-2 bg-transparent focus:outline-none transition-all duration-300 ${
                isSidebarOpen ? 'opacity-100 w-full' : 'opacity-0 w-0'
              }`}
            />
          </div>
        </div>
        <nav className='mt-2 flex-grow'>
          <NavItem icon={Zap} label='Fine-Tune' isOpen={isSidebarOpen} />
          <NavItem icon={Database} label='Datasets' isOpen={isSidebarOpen} />
          <NavItem icon={Tag} label='Tags' isOpen={isSidebarOpen} />
        </nav>
        <div className='p-4'>
          <div
            className={`flex space-x-2 ${
              isSidebarOpen ? 'justify-start' : 'justify-center'
            }`}
          >
            <button className='px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md'>
              Requests
            </button>
            {isSidebarOpen && (
              <button className='px-3 py-1 text-sm text-gray-600 rounded-md transition-opacity duration-300'>
                Traces
              </button>
            )}
          </div>
        </div>
        {isSidebarOpen && (
          <div className='p-4'>
            <p className='text-sm text-gray-500 transition-opacity duration-300'>
              No requests found
            </p>
          </div>
        )}
        {isSidebarOpen && (
          <div className='p-4'>
            <button className='w-full px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-md text-left transition-all duration-300'>
              Click here to turn off the default date range limit
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Header */}
        <header className='bg-white shadow-sm z-10'>
          <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
              <button className='px-3 py-2 bg-gray-100 rounded-md text-sm font-medium flex items-center'>
                <Users className='mr-2' size={16} />
                Personal
              </button>
              <button className='px-3 py-2 bg-gray-200 rounded-md text-sm font-medium flex items-center'>
                <Home className='mr-2' size={16} />
                Home
              </button>
              <button className='px-3 py-2 rounded-md text-sm font-medium flex items-center'>
                <FileText className='mr-2' size={16} />
                Registry
              </button>
              <button className='px-3 py-2 rounded-md text-sm font-medium flex items-center'>
                <Gauge className='mr-2' size={16} />
                Evaluate
              </button>
              <button className='px-3 py-2 rounded-md text-sm font-medium flex items-center'>
                <LineChart className='mr-2' size={16} />
                Analytics
              </button>
              <button className='px-3 py-2 rounded-md text-sm font-medium flex items-center'>
                <PlayCircle className='mr-2' size={16} />
                Playground
              </button>
            </div>
            <div className='flex items-center space-x-4'>
              <Button className='p-2 rounded-full bg-gray-200 hover:bg-gray-300'>
                <Bell size={20} className='text-gray-600' />
              </Button>
              <Button className='p-2 rounded-full bg-gray-200 hover:bg-gray-300'>
                <Settings size={20} className='text-gray-600' />
              </Button>
            </div>
          </div>
        </header>

        {/* Main container */}
        <main className='flex-1 overflow-y-auto bg-gray-100 p-4'>
          <div className='max-w-7xl mx-auto space-y-6'>
            {/* Welcome Message */}
            <Card>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h1 className='text-2xl font-semibold text-gray-900'>
                      Welcome, Alex!
                    </h1>
                    <p className='mt-1 text-sm text-gray-600'>
                      Ready to continue your learning journey?
                    </p>
                  </div>
                  <img
                    src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laptop-3KuTdUIfjR4ft30g37FdkeOTYzomYV.png'
                    alt='Laptop illustration'
                    className='h-24 w-auto object-contain'
                  />
                </div>
              </CardContent>
            </Card>

            {/* Previous Years Papers and Sample Question Papers */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <PreviousYearsPapers papers={previousYearsPapers} />
              <SampleQuestionPapers papers={samplePapers} />
            </div>

            {/* Your Attempts and Results */}
            <YourAttemptsAndResults attempts={attempts} />

            {/* Progress Chart */}
            <ProgressChart data={progressData} />
          </div>
        </main>

        {/* Footer */}
        <footer className='bg-white border-t border-gray-200 py-4'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center'>
              <div className='text-sm text-gray-500'>
                © 2024 EduTech. All rights reserved.
              </div>
              <div className='flex space-x-6'>
                <a
                  href='#'
                  className='text-sm text-gray-500 hover:text-gray-900'
                >
                  Privacy Policy
                </a>
                <a
                  href='#'
                  className='text-sm text-gray-500 hover:text-gray-900'
                >
                  Terms of Service
                </a>
                <a
                  href='#'
                  className='text-sm text-gray-500 hover:text-gray-900'
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
