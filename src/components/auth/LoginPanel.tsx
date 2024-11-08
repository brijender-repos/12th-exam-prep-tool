'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaGoogle, FaMicrosoft, FaApple } from 'react-icons/fa';

export function LoginPanel() {
  const [activeTab, setActiveTab] = useState('signin');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your sign-in logic here
    console.log('Sign in with:', emailOrPhone, password);
    router.push('/dashboard');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpSent) {
      // Send OTP logic here
      setIsOtpSent(true);
    } else {
      // Verify OTP and create account
      console.log('Sign up with:', emailOrPhone, otp.join(''));
      router.push('/dashboard');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className='w-full max-w-md p-6 bg-background rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Welcome</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='grid w-full grid-cols-2 mb-6'>
          <TabsTrigger value='signin'>Sign In</TabsTrigger>
          <TabsTrigger value='signup'>Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value='signin'>
          <form onSubmit={handleSignIn} className='space-y-4'>
            <div>
              <Label htmlFor='emailOrPhone'>Email or Phone</Label>
              <Input
                id='emailOrPhone'
                type='text'
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type='submit' className='w-full'>
              Sign In
            </Button>
          </form>
        </TabsContent>
        <TabsContent value='signup'>
          <form onSubmit={handleSignUp} className='space-y-4'>
            <div>
              <Label htmlFor='signupEmailOrPhone'>Email or Phone</Label>
              <Input
                id='signupEmailOrPhone'
                type='text'
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
              />
            </div>
            {isOtpSent && (
              <div>
                <Label>Enter OTP</Label>
                <div className='flex justify-between mt-2'>
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type='text'
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className='w-10 text-center'
                    />
                  ))}
                </div>
              </div>
            )}
            <Button type='submit' className='w-full'>
              {isOtpSent ? 'Verify OTP' : 'Send OTP'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
      <div className='mt-6'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>
        <div className='mt-6 grid grid-cols-3 gap-3'>
          <Button variant='outline' onClick={() => handleSocialLogin('Google')}>
            <FaGoogle className='mr-2 h-4 w-4' />
            Google
          </Button>
          <Button
            variant='outline'
            onClick={() => handleSocialLogin('Microsoft')}
          >
            <FaMicrosoft className='mr-2 h-4 w-4' />
            Microsoft
          </Button>
          <Button variant='outline' onClick={() => handleSocialLogin('Apple')}>
            <FaApple className='mr-2 h-4 w-4' />
            Apple
          </Button>
        </div>
      </div>
    </div>
  );
}
