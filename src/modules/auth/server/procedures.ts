import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { user } from "@/db/schema";
import publicProcedure from "@/trpc/procedures/public";
import { router } from "@/trpc/trpc";

export const authRouter = router({
  checkUserExists: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .query(async ({ input }) => {
      const existingUser = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.email, input.email))
        .limit(1);

      return {
        exists: existingUser.length > 0,
      };
    }),
});
