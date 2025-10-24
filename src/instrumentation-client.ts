// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import {
  browserTracingIntegration,
  captureRouterTransitionStart,
  init,
  replayIntegration,
} from "@sentry/nextjs";
import posthog from "posthog-js";

import { env } from "@/env";

const PRODUCTION_TRACES_SAMPLE_RATE = 0.1;

const PRODUCTION_REPLAYS_SESSION_SAMPLE_RATE = 0.1;

const PRODUCTION_REPLAYS_ON_ERROR_SAMPLE_RATE = 0.1;

init({
  dsn: env.NEXT_PUBLIC_SENTRY_DSN || "",

  // Add optional integrations for additional features
  integrations: [replayIntegration(), browserTracingIntegration()],

  _experiments: { enableLogs: true },

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate:
    process.env.VERCEL_ENV === "production" ? PRODUCTION_TRACES_SAMPLE_RATE : 1,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate:
    process.env.VERCEL_ENV === "production"
      ? PRODUCTION_REPLAYS_SESSION_SAMPLE_RATE
      : 1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate:
    process.env.VERCEL_ENV === "production"
      ? PRODUCTION_REPLAYS_ON_ERROR_SAMPLE_RATE
      : 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

// Initialize PostHog for analytics
posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  defaults: "2025-05-24",
  capture_exceptions: true,
  debug: process.env.NODE_ENV === "development",
});

export const onRouterTransitionStart = captureRouterTransitionStart;
