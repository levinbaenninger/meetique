# Meetique

**Professional AI-Powered Meeting Platform**

AI-powered meeting platform for video meetings with custom AI agents, featuring real-time transcription and automated summaries.

![Screenshot of App](./assets/preview.png)

## Features

- Custom AI agents with personalized instructions
- Real-time video calling with Stream Video SDK
- Automatic transcription and AI-powered summaries
- Magic link and OAuth authentication (Google, GitHub)
- Premium subscription tiers with usage limits

## Tech Stack

Next.js 15, TypeScript, Tailwind CSS, tRPC, PostgreSQL (Drizzle ORM), Better Auth, Stream Video, OpenAI GPT-4, Inngest, Polar, Sentry, Arcjet, PostHog

## Prerequisites

- Node.js 18+, Bun
- Accounts: Neon, Stream Video, OpenAI, Resend, Polar, Sentry, Arcjet, PostHog
- OAuth apps: GitHub and/or Google

## Environment Variables

Create a `.env` file with the following:

```bash
DATABASE_URL="postgres://username:password@host/neondb?sslmode=require"
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
NEXT_PUBLIC_STREAM_VIDEO_API_KEY="..."
STREAM_VIDEO_API_SECRET="..."
OPENAI_API_KEY="..."
RESEND_API_KEY="..."
POLAR_ACCESS_TOKEN="..."
POLAR_SERVER="sandbox"
NEXT_PUBLIC_SENTRY_DSN="..."
SENTRY_AUTH_TOKEN="..."
ARCJET_KEY="..."
NEXT_PUBLIC_POSTHOG_KEY="..."
NEXT_PUBLIC_POSTHOG_HOST="..."
```

See [Setup Guide](docs/setup.md) for detailed configuration instructions.

## Getting Started

```bash
git clone https://github.com/levinbaenninger/meetique.git
cd meetique
bun install
cp .env.example .env
# Edit .env with your values
bun db:migrate
bun dev
```

Open http://localhost:3000

## Development

```bash
bun db:migrate      # Run migrations
bun db:studio       # Open database UI
bun typecheck       # Type checking
bun lint:check      # Linting
bun format:check    # Formatting
bun build           # Production build
```

## Project Structure

```
src/
├── app/            # Next.js App Router
├── components/     # UI components
├── db/             # Database & migrations
├── lib/            # Utilities
├── modules/        # Feature modules (agents, meetings, call, premium)
└── trpc/           # API layer
```

## Documentation

- [Setup Guide](docs/setup.md) - Environment configuration
- [Architecture](docs/architecture.md) - System design
- [Troubleshooting](docs/troubleshooting.md) - Common issues
- [Contributing](.github/CONTRIBUTING.md) - Contribution guidelines
- [Security](.github/SECURITY.md) - Security policy

## License

MIT License - see [LICENSE](LICENSE) file.
