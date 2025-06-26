import publicProcedure from '../../procedures/public';
import { router } from '../../trpc';

export const helloRouter = router({
  hello: publicProcedure.query(() => 'Hello World'),
});
