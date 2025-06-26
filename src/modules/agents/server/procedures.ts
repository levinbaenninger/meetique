import { db } from '@/db';
import { agents } from '@/db/schema';
import publicProcedure from '@/trpc/procedures/public';
import { router } from '@/trpc/trpc';

export const agentsRouter = router({
  list: publicProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
  }),
});
