import React from 'react';
import { BookOpen, Zap } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
};

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className='px-4 py-5 bg-white shadow-sm rounded-lg overflow-hidden sm:p-6'>
      <dl>
        <dt className='text-sm font-medium text-gray-500 truncate'>{title}</dt>
        <dd className='mt-1 text-3xl font-semibold text-gray-900'>{value}</dd>
      </dl>
    </div>
  );
}
