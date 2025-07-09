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

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(128, { message: 'Password must be less than 128 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(null);
    setIsPending(true);

    authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push('/');
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
                  <h1 className='text-2xl font-bold'>
                    Let&apos;s get started!
                  </h1>
                  <p className='text-muted-foreground text-balance'>
                    Create an account to continue
                  </p>
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='John Doe'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            placeholder='************'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            placeholder='************'
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
                    'Sign Up'
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
                  Already have an account?{' '}
                  <Link
                    href='/sign-in'
                    className='underline underline-offset-4'
                  >
                    Sign In
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
