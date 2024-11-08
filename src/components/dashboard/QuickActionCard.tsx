import React from 'react';
import { LucideIcon } from 'lucide-react';

export type QuickActionCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action: string;
};

export default function QuickActionCard({
  icon: Icon,
  title,
  description,
  action,
}: QuickActionCardProps) {
  return (
    <div className='bg-white overflow-hidden shadow-sm rounded-lg'>
      <div className='p-5'>
        <div className='flex items-center mb-4'>
          <div className='flex-shrink-0 bg-blue-100 rounded-full p-3'>
            <Icon className='h-6 w-6 text-blue-600' aria-hidden='true' />
          </div>
          <div className='ml-4'>
            <h3 className='text-lg font-medium text-gray-900'>{title}</h3>
          </div>
        </div>
        <p className='text-sm text-gray-500'>{description}</p>
      </div>
      <div className='bg-gray-50 px-5 py-3'>
        <div className='text-sm'>
          <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
            {action}
          </a>
        </div>
      </div>
    </div>
  );
}
