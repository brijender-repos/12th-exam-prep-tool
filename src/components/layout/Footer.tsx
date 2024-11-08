import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-white border-t border-gray-200 py-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='text-sm text-gray-500'>
              © 2024{' '}
              <a 
                href="https://www.cbsescholars.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                CBSE Scholars
              </a>
              . All rights reserved.
            </div>
            <div className='flex space-x-6'>
              <Link 
                href='/privacy' 
                className='text-sm text-gray-500 hover:text-gray-900'
              >
                Privacy Policy
              </Link>
              <Link 
                href='/terms' 
                className='text-sm text-gray-500 hover:text-gray-900'
              >
                Terms of Service
              </Link>
              <a 
                href='https://www.cbsescholars.in/contact' 
                target="_blank" 
                rel="noopener noreferrer" 
                className='text-sm text-gray-500 hover:text-gray-900'
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}