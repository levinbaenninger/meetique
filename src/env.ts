import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    // Database
    DATABASE_URL: z.string().url(),

    // AI Services
    OPENAI_API_KEY: z.string().min(1),

    // External Services
    POLAR_ACCESS_TOKEN: z.string().min(1),
    POLAR_SERVER: z.enum(['sandbox', 'production']),
    RESEND_API_KEY: z.string().min(1),

    // Auth Providers
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),

    // Security
    ARCJET_KEY: z.string().min(1),

    // Stream Video
    STREAM_VIDEO_API_SECRET: z.string().min(1),

    // Sentry (optional with defaults)
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
  },
  client: {
    // Analytics & Monitoring
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),

    // Stream Video
    NEXT_PUBLIC_STREAM_VIDEO_API_KEY: z.string().min(1),
  },
  runtimeEnv: {
    // Server
    DATABASE_URL: process.env.DATABASE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    POLAR_SERVER: process.env.POLAR_SERVER,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    ARCJET_KEY: process.env.ARCJET_KEY,
    STREAM_VIDEO_API_SECRET: process.env.STREAM_VIDEO_API_SECRET,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,

    // Client
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_STREAM_VIDEO_API_KEY:
      process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
  },
});
