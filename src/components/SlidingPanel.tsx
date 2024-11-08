'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { Button } from './ui/button';

interface SlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function SlidingPanel({
  isOpen,
  onClose,
  title,
  children,
}: SlidingPanelProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black'
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className='fixed top-0 right-0 bottom-0 w-96 bg-background shadow-lg'
          >
            <div className='p-4'>
              <div className='flex justify-between items-center mb-4'>
                {title && <h2 className='text-2xl font-bold'>{title}</h2>}
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={onClose}
                  className='ml-auto'
                >
                  <FaTimes className='h-4 w-4' />
                </Button>
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
