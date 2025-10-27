// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

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
