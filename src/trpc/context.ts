import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

export const createContext = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    session,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
