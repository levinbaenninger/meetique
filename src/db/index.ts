import { drizzle } from "drizzle-orm/neon-http";

// biome-ignore lint/performance/noNamespaceImport: Will be replace with serverless neon soon
import * as schema from "@/db/schema";
import { env } from "@/env";

export const db = drizzle(env.DATABASE_URL, { schema });
