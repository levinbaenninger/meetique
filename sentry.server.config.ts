import { init } from "@sentry/nextjs";

import { env } from "@/env";

const PRODUCTION_TRACES_SAMPLE_RATE = 0.1;

init({
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate:
    process.env.VERCEL_ENV === "production" ? PRODUCTION_TRACES_SAMPLE_RATE : 1,
});
