import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, OctagonAlertIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { SocialButtons } from './social-buttons';

const emailSchema = z.object({
  email: z.string().email(),
});

interface EmailStepProps {
  onSubmit: (email: string) => void;
  onSocialAuth: (provider: 'google' | 'github') => void;
  isLoading?: boolean;
  error?: string | null;
}

export const EmailStep = ({
  onSubmit,
  onSocialAuth,
  isLoading = false,
  error = null,
}: EmailStepProps) => {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof emailSchema>) => {
    onSubmit(values.email);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='p-6 md:p-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-2xl font-bold'>Welcome!</h1>
            <p className='text-muted-foreground text-balance'>
              Enter your email to continue
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

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              'Continue'
            )}
          </Button>

          <SocialButtons onSocialAuth={onSocialAuth} isLoading={isLoading} />
        </div>
      </form>
    </Form>
  );
};
