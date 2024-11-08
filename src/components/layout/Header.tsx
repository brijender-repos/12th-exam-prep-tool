'use client';

import { Bell, Settings } from 'lucide-react';
import LoginHeaderButton from '../auth/LoginHeaderButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Left side empty for future use */}
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <Bell size={20} className="text-gray-600" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                <Settings size={20} className="text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
              <DropdownMenuItem asChild>
                <Link href="/settings?tab=subscription">
                  My Subscription
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings?tab=feedback">
                  Give Feedback
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings?tab=profile">
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <LoginHeaderButton />
        </div>
      </div>
    </header>
  );
}