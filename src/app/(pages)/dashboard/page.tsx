import React from 'react';
import { BookOpen, GraduationCap, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import YourAttemptsAndResults from '@/components/dashboard/YourAttemptsAndResults';
import SamplePapers from '@/components/dashboard/SamplePapers';
import PreviousYearsPapers from '@/components/dashboard/PreviousYearsPapers';
import ProgressChart from '@/components/dashboard/ProgressChart';
import StatCard from '@/components/dashboard/StatCard';
import QuickActionCard from '@/components/dashboard/QuickActionCard';

export default function DashboardPage() {
  return (
    <div className='max-w-7xl mx-auto'>
      {/* Welcome Message */}
      <div className='bg-white shadow-sm rounded-lg p-6 mb-6'>
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
      </div>

      {/* Quick Actions Section */}
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-4'>
          Quick Actions
        </h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2'>
          <QuickActionCard
            icon={BookOpen}
            title='Create a prompt template'
            description='Visually edit prompts in our dashboard. Compare versions and see when they are used.'
            action='Learn more'
          />
          <QuickActionCard
            icon={Zap}
            title='Deploy templates to production'
            description='Programmatically fetch your templates. Publish new prompts through our dashboard.'
            action='Learn more'
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className='space-y-6'>
        {/* Sample Question Papers */}
        <SamplePapers />
        {/* Previous Years Papers */}
        <PreviousYearsPapers />
      </div>

      <div className='mt-6'>
        {/* Previous Attempts & Results */}
        <YourAttemptsAndResults />
      </div>

      <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <GraduationCap className='h-6 w-6' />
              Practice Tests
            </CardTitle>
            <CardDescription>
              Take practice tests to improve your skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className='w-full'>
              <Link href='/exams'>Start Practice</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BookOpen className='h-6 w-6' />
              Study Materials
            </CardTitle>
            <CardDescription>
              Access comprehensive study resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant='secondary' className='w-full'>
              <Link href='/tests'>View Materials</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Tracking Section */}
      <div className='mt-6 bg-white shadow-sm rounded-lg overflow-hidden'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg font-medium text-gray-900'>
            Progress Tracking
          </h3>
        </div>
        <div className='border-t border-gray-200 px-4 py-5 sm:p-6'>
          <div className='mt-1 text-3xl font-semibold text-gray-900'>
            Your Progress
          </div>
          <p className='mt-2 text-sm text-gray-700'>
            Here's an overview of your learning journey
          </p>
          <div className='mt-4'>
            <ProgressChart />
          </div>
          <div className='mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3'>
            <StatCard title='Total Attempts' value='24' />
            <StatCard title='Average Score' value='87%' />
            <StatCard title='Time Spent' value='32h 15m' />
          </div>
        </div>
      </div>
    </div>
  );
}