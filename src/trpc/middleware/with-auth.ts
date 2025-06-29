import { TRPCError } from '@trpc/server';
import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { middleware } from '@/trpc/trpc';

export const withAuth = middleware(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    });
  }

  return next({
    ctx: {
      ...ctx,
      session,
    },
  });
});
