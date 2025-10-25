import { withAuth } from "@/trpc/middleware/with-auth";
import { procedure } from "@/trpc/trpc";

const protectedProcedure = procedure.use(withAuth);

export default protectedProcedure;
