import Link from 'next/link';
import { ReactNode } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import { AuthBranding } from './auth-branding';

interface AuthCardProps {
  children: ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          {children}
          <AuthBranding />
        </CardContent>
      </Card>

      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline-offset-8'>
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
