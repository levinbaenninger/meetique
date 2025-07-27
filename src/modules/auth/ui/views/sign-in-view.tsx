'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, OctagonAlertIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { z } from 'zod';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

const formSchema = z.object({
  email: z.string().email(),
});

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(null);
    setIsPending(true);

    authClient.signIn.magicLink(
      {
        email: values.email,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          router.push(`/check-email?email=${encodeURIComponent(values.email)}`);
        },
        onError: ({ error }) => {
          setError(error.message);
        },
        onResponse: () => {
          setIsPending(false);
        },
      },
    );
  };
  const onSocial = (provider: 'google' | 'github') => {
    setError(null);
    setIsPending(true);

    authClient.signIn.social(
      { provider, callbackURL: '/' },
      {
        onError: ({ error }) => {
          setError(error.message);
        },
        onResponse: () => {
          setIsPending(false);
        },
      },
    );
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 md:p-8'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-2xl font-bold'>Welcome back!</h1>
                  <p className='text-muted-foreground text-balance'>
                    Login to your account to continue
                  </p>
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder='mail@example.com'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className='bg-destructive/10 text-destructive border-none'>
                    <OctagonAlertIcon className='!text-destructive h-4 w-4' />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button type='submit' className='w-full' disabled={isPending}>
                  {isPending ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    'Send Magic Link'
                  )}
                </Button>
                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                  <span className='bg-card text-muted-foreground relative z-10 px-2'>
                    Or continue with
                  </span>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <Button
                    onClick={() => onSocial('google')}
                    variant='outline'
                    type='button'
                    className='w-full'
                  >
                    <FaGoogle />
                  </Button>
                  <Button
                    onClick={() => onSocial('github')}
                    variant='outline'
                    type='button'
                    className='w-full'
                  >
                    <FaGithub />
                  </Button>
                </div>
                <div className='text-center text-sm'>
                  Don&apos;t have an account?{' '}
                  <Link
                    href='/sign-up'
                    className='underline underline-offset-4'
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className='from-sidebar-accent to-sidebar relative hidden flex-col items-center justify-center gap-y-5 bg-radial md:flex'>
            <img src='/logo.svg' alt='logo' className='h-[92px] w-[92px]' />
            <p className='text-2xl font-semibold text-white'>Meetique</p>
          </div>
        </CardContent>
      </Card>

      <div className='text-muted-foreground *:[a]:hover:text-primary text-cs text-center text-balance *:[a]:underline-offset-8'>
        By clicking continue, you agree to our{' '}
        <Link href='/terms' className='underline underline-offset-4'>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href='/privacy' className='underline underline-offset-4'>
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
};
