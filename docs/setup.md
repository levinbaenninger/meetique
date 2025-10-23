# Environment Setup Guide

Complete configuration guide for Meetique external services.

## Prerequisites

- Node.js 18+ - [Download](https://nodejs.org/)
- Bun - `curl -fsSL https://bun.sh/install | bash`
- Git - [Download](https://git-scm.com/)

## Required Services

### Database (Neon PostgreSQL)

1. Create account at [Neon.tech](https://neon.tech/)
2. Create new project and copy connection string
3. Add to `.env`: `DATABASE_URL="postgresql://...?sslmode=require"`

### Authentication

**GitHub OAuth**
1. Create OAuth app at [GitHub Developer Settings](https://github.com/settings/developers)
2. Set callback URL: `http://localhost:3000/api/auth/callback/github`
3. Add to `.env`: `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`

**Google OAuth**
1. Create project at [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth credentials with redirect URI: `http://localhost:3000/api/auth/callback/google`
3. Add to `.env`: `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

### Stream Video

1. Sign up at [GetStream.io](https://getstream.io/)
2. Create app and get credentials
3. Add to `.env`: `NEXT_PUBLIC_STREAM_VIDEO_API_KEY` and `STREAM_VIDEO_API_SECRET`
4. Configure webhook URL in dashboard: `https://your-ngrok-url.app/api/webhook`

### OpenAI

1. Create account at [OpenAI Platform](https://platform.openai.com/)
2. Add billing information and create API key
3. Add to `.env`: `OPENAI_API_KEY="sk-..."`
4. Set usage limits to avoid unexpected charges

### Resend (Email)

1. Sign up at [Resend.com](https://resend.com/)
2. Create API key
3. Add to `.env`: `RESEND_API_KEY="re_..."`

### Polar (Payments)

1. Sign up at [Polar.sh](https://polar.sh/)
2. Create API key in settings
3. Add to `.env`: `POLAR_ACCESS_TOKEN` and `POLAR_SERVER="sandbox"`

### Sentry (Error Tracking)

1. Create project at [Sentry.io](https://sentry.io/)
2. Get DSN from project settings
3. Add to `.env`: `NEXT_PUBLIC_SENTRY_DSN` and `SENTRY_AUTH_TOKEN`

### Arcjet (Security)

1. Sign up at [Arcjet.com](https://arcjet.com/)
2. Create site and get API key
3. Add to `.env`: `ARCJET_KEY`

### PostHog (Analytics)

1. Sign up at [PostHog.com](https://posthog.com/)
2. Create project (EU region recommended)
3. Add to `.env`: `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`

## Project Setup

```bash
git clone https://github.com/levinbaenninger/meetique.git
cd meetique
bun install
cp .env.example .env
# Edit .env with your credentials
bun db:migrate
bun dev
```

## Verification

1. Visit `http://localhost:3000`
2. Test authentication (magic link or OAuth)
3. Create test agent and meeting
4. Verify video call functionality
5. Check error tracking in Sentry dashboard
6. Verify analytics in PostHog dashboard

## Troubleshooting

See [Troubleshooting Guide](troubleshooting.md) for detailed solutions.

---

Setup complete.
