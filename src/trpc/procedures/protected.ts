import { withAuth } from '../middleware/with-auth';
import { procedure } from '../trpc';

const protectedProcedure = procedure.use(withAuth);

export default protectedProcedure;
