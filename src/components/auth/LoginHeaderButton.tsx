'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { SlidingPanel } from '../SlidingPanel';
import { LoginPanel } from './LoginPanel';

export default function LoginHeaderButton() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const pathname = usePathname();

  const isLoggedIn = pathname.startsWith('/dashboard');

  const handleLogout = () => {
    // Implement logout logic here
    console.log('User logged out');
    // Redirect to home page after logout
    window.location.href = '/';
  };

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <Button variant='ghost' onClick={handleLogout}>
            <FaSignOutAlt className='mr-2 h-4 w-4' />
            Logout
          </Button>
        ) : (
          <Button variant='ghost' onClick={() => setIsLoginOpen(true)}>
            <FaSignInAlt className='mr-2 h-4 w-4' />
            Login
          </Button>
        )}
      </nav>
      {!isLoggedIn && (
        <SlidingPanel
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          title='Login'
        >
          <LoginPanel />
        </SlidingPanel>
      )}
    </div>
  );
}
