import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <span className="text-xl">
              <a 
                href="https://www.cbsescholars.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-primary hover:text-primary/90"
              >
                CBSE Scholars
              </a>
            </span>
          </div>
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow bg-gray-50">
        <section className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-6">Welcome to 12th Exam Prep</h1>
            <p className="text-xl mb-8 text-gray-600">
              Your trusted companion for CBSE exam preparation. Ace your 12th Board Exams with our comprehensive exam platform, sample question papers, practice tests and study materials.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/login">Start Learning</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/exams">Browse Sample Papers</Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Practice Tests</h3>
              <p className="text-gray-600">Access a wide range of practice tests and sample papers to enhance your preparation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Detailed Solutions</h3>
              <p className="text-gray-600">Get comprehensive explanations and step-by-step solutions for all questions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Progress Tracking</h3>
              <p className="text-gray-600">Monitor your performance and track your improvement with detailed analytics.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">About Us</h3>
              <p className="text-sm text-gray-600">
                CBSE Scholars is dedicated to helping students achieve excellence in their board examinations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/exams">Sample Papers</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/reports">Progress Reports</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p className="text-sm text-gray-600">
                Email: support@cbsescholars.in<br />
                Phone: +91 XXX XXX XXXX
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
            © 2024 CBSE Scholars. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}