// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import {
  captureRouterTransitionStart,
  init,
  replayIntegration,
} from "@sentry/nextjs";

import { env } from "@/env";

// Skip Sentry initialization in local development
if (process.env.NODE_ENV !== "development") {
  const PRODUCTION_TRACES_SAMPLE_RATE = 0.1;
  const PRODUCTION_REPLAYS_SESSION_SAMPLE_RATE = 0.1;
  const PRODUCTION_REPLAYS_ON_ERROR_SAMPLE_RATE = 0.1;

  init({
    dsn: env.NEXT_PUBLIC_SENTRY_DSN,
    sendDefaultPii: true,
    tracesSampleRate:
      process.env.VERCEL_ENV === "production"
        ? PRODUCTION_TRACES_SAMPLE_RATE
        : 1,
    integrations: [replayIntegration()],
    replaysSessionSampleRate:
      process.env.VERCEL_ENV === "production"
        ? PRODUCTION_REPLAYS_SESSION_SAMPLE_RATE
        : 1,
    replaysOnErrorSampleRate:
      process.env.VERCEL_ENV === "production"
        ? PRODUCTION_REPLAYS_ON_ERROR_SAMPLE_RATE
        : 1,
    enableLogs: true,
  });
}

export const onRouterTransitionStart = captureRouterTransitionStart;
