'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  return (
    <div className='flex flex-col gap-y-4 p-4'>
      <p>Logged in as {session?.user.name}</p>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push('/sign-in');
              },
            },
          })
        }
      >
        Sign Out
      </Button>
    </div>
  );
};
