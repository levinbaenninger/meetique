import { FaGithub, FaGoogle } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

interface SocialButtonsProps {
  onSocialAuth: (provider: 'google' | 'github') => void;
  isLoading?: boolean;
}

export const SocialButtons = ({
  onSocialAuth,
  isLoading = false,
}: SocialButtonsProps) => {
  return (
    <>
      <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
        <span className='bg-card text-muted-foreground relative z-10 px-2'>
          Or continue with
        </span>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Button
          onClick={() => onSocialAuth('google')}
          variant='outline'
          type='button'
          className='w-full'
          disabled={isLoading}
        >
          <FaGoogle />
        </Button>
        <Button
          onClick={() => onSocialAuth('github')}
          variant='outline'
          type='button'
          className='w-full'
          disabled={isLoading}
        >
          <FaGithub />
        </Button>
      </div>
    </>
  );
};
