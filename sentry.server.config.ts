import { init } from "@sentry/nextjs";

import { env } from "@/env";

// Skip Sentry initialization in local development
if (process.env.NODE_ENV !== "development") {
  const PRODUCTION_TRACES_SAMPLE_RATE = 0.1;

  init({
    dsn: env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate:
      process.env.VERCEL_ENV === "production"
        ? PRODUCTION_TRACES_SAMPLE_RATE
        : 1,
  });
}
