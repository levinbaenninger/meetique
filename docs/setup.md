# Environment Setup Guide

Complete configuration guide for Meetique external services.

## Prerequisites

- Node.js 18+ - [Download](https://nodejs.org/)
- Bun - `curl -fsSL https://bun.sh/install | bash`
- Git - [Download](https://git-scm.com/)

## Webhook Testing Setup (ngrok)

For local development, webhooks from external services (like Stream Video) need a public URL to reach your localhost. We use ngrok for this.

### Installation

```bash
# macOS
brew install ngrok/ngrok/ngrok

# Windows (with Chocolatey)
choco install ngrok
```

### Get Your Static ngrok URL

1. Sign up for free at [ngrok.com](https://ngrok.com/) 📝
2. Navigate to [Domains](https://dashboard.ngrok.com/domains) in your dashboard
3. Create a new static domain (free tier includes one)
4. Copy your domain (e.g., `your-domain.ngrok-free.dev`)

### Configure package.json

Replace the ngrok URL in your `package.json`:

```json
"dev:webhook": "ngrok http --url=your-domain.ngrok-free.dev 3000"
```

**Example:**

```json
"dev:webhook": "ngrok http --url=peaceful-shark-awesome.ngrok-free.dev 3000"
```

### Update Webhook URLs

After setting up your ngrok domain, configure it in:

1. **Stream Video Dashboard**: `https://your-domain.ngrok-free.dev/api/webhook`
2. **Other webhook services** as needed

## Required Services

### Database (Neon PostgreSQL)

1. Create account at [Neon.tech](https://neon.tech/)
2. Create new project and copy connection string
3. Add to `.env`: `DATABASE_URL="postgresql://...?sslmode=require"`

### Authentication

#### GitHub OAuth

1. Create OAuth app at [GitHub Developer Settings](https://github.com/settings/developers)
2. Set callback URL: `http://localhost:3000/api/auth/callback/github`
3. Add to `.env`: `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`

#### Google OAuth

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

---

Setup complete.
