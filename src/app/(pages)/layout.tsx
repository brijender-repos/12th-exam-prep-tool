'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar, { SidebarProps } from '@/components/layout/Sidebar';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className='flex h-screen bg-gray-100'>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <Header />
        <main className='flex-1 overflow-y-auto bg-gray-100 p-4'>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
