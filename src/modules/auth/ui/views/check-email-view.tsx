'use client';

import { CheckCircle, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';

interface Props {
  email: string;
  name?: string;
}

export const CheckEmailView = ({ email, name }: Props) => {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const [lastResendTime, setLastResendTime] = useState<number>(Date.now());
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (lastResendTime) {
      const updateCountdown = () => {
        const elapsed = Date.now() - lastResendTime;
        const remaining = Math.max(0, 60 * 1000 - elapsed);
        const remainingSeconds = Math.ceil(remaining / 1000);

        setCountdown(remainingSeconds);

        if (remainingSeconds <= 0) {
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
        }
      };

      updateCountdown();
      interval = setInterval(updateCountdown, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [lastResendTime]);

  const canResend = countdown <= 0;

  const handleResendEmail = async () => {
    if (!email) {
      toast.error('Email not found. Please try signing up/signing in again.');
      return;
    }

    if (!canResend) {
      toast.error(
        `Please wait ${countdown} seconds before requesting another email.`,
      );
      return;
    }

    setIsResending(true);
    try {
      await authClient.signIn.magicLink({
        name: name,
        email: email,
        callbackURL: '/',
      });
      setLastResendTime(Date.now());
      toast.success('Magic link sent! Check your inbox.');
    } catch (error) {
      console.error('Resend magic link error:', error);
      toast.error('Failed to resend magic link. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckVerification = async () => {
    try {
      const response = await authClient.getSession();
      if (response.data?.session) {
        toast.success('Magic link verified successfully!');
        router.push('/');
      } else {
        toast.error('Magic link not verified yet. Please check your inbox.');
      }
    } catch {
      toast.error('Failed to check magic link status.');
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <div className='p-6 md:p-8'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-bold'>Check your email</h1>
                <p className='text-muted-foreground mt-2 text-balance'>
                  We&apos;ve sent you a magic link to{' '}
                  <span className='font-medium'>{email}</span>
                </p>
              </div>

              <div className='space-y-4'>
                <div className='bg-muted/50 rounded-lg p-4'>
                  <div className='flex items-center gap-3 text-sm'>
                    <CheckCircle className='text-primary h-6 w-6' />
                    <span>
                      Check your inbox (and spam folder) for the magic link
                    </span>
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <Button
                    onClick={handleCheckVerification}
                    className='w-full'
                    variant='default'
                  >
                    I&apos;ve verified my magic link
                  </Button>

                  <Button
                    onClick={handleResendEmail}
                    disabled={isResending || !canResend}
                    variant='outline'
                    className='w-full'
                  >
                    {isResending ? (
                      <>
                        <Loader2 className='h-4 w-4 animate-spin' />
                        Resending...
                      </>
                    ) : !canResend ? (
                      <>
                        <Mail className='h-4 w-4' />
                        Resend in {countdown}s
                      </>
                    ) : (
                      <>
                        <Mail className='h-4 w-4' />
                        Resend magic link
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className='text-muted-foreground text-center text-sm'>
                Need help?{' '}
                <Link
                  href='/sign-in'
                  className='hover:text-primary underline underline-offset-4'
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>

          <div className='from-sidebar-accent to-sidebar relative hidden flex-col items-center justify-center gap-y-5 bg-radial md:flex'>
            <img src='/logo.svg' alt='logo' className='h-[92px] w-[92px]' />
            <p className='text-2xl font-semibold text-white'>Meetique</p>
          </div>
        </CardContent>
      </Card>

      <div className='text-muted-foreground text-center text-xs text-balance'>
        The magic link will expire in 24 hours for security reasons.
      </div>
    </div>
  );
};
