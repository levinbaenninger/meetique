# Meetique 🤖

**Meet with an agent. Get a clear summary. Stay focused.**

Meetique is an AI-powered meeting platform that enables users to schedule and conduct video meetings with custom AI agents. The platform provides real-time video calling, automatic transcription, and AI-powered meeting summaries to enhance productivity and focus.

![Screenshot of App](./assets/preview.png)

## 🚀 Features

### Core Features

- **🤖 Custom AI Agents**: Create personalized AI agents with specific instructions and behavior
- **📞 Video Meetings**: Real-time video calling with AI agents using Stream Video SDK
- **📝 Auto Transcription**: Automatic meeting transcription with closed captions
- **🎯 AI Summaries**: GPT-4 powered meeting summaries with detailed notes and insights
- **🔐 Authentication**: Secure authentication with email/password and social OAuth (Google, GitHub)
- **💰 Premium Tiers**: Subscription-based model with different usage limits

### Premium Tiers

- **🆓 Free**: 3 agents, 5 meetings
- **🚀 Starter**: Unlimited agents, 30 meetings/month
- **💎 Pro**: Unlimited agents, unlimited meetings
- **🏢 Enterprise**: Unlimited agents, unlimited meetings

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation

### Backend

- **API**: tRPC for type-safe API layer
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with social providers
- **Video**: Stream Video SDK
- **AI**: OpenAI GPT-4 for summarization
- **Background Jobs**: Inngest for async processing
- **Payments**: Polar for subscription management

### Infrastructure

- **Hosting**: Vercel
- **Database**: Neon PostgreSQL
- **CDN**: Vercel Edge Network
- **Monitoring**: Built-in Vercel Analytics

## 📋 Prerequisites

- Node.js 18+
- pnpm
- Neon database
- Stream Video account
- OpenAI API key
- Polar account for payments
- GitHub and/or Google OAuth apps

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgres://username:password@host/neondb?sslmode?require"

# Authentication - GitHub OAuth
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Authentication - Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Stream Video
NEXT_PUBLIC_STREAM_VIDEO_API_KEY="your_stream_video_api_key"
STREAM_VIDEO_API_SECRET="your_stream_video_secret"

# OpenAI
OPENAI_API_KEY="your_openai_api_key"

# Polar Payments
POLAR_ACCESS_TOKEN="your_polar_access_token"
POLAR_SERVER="sandbox"
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/levinbaenninger/meetique.git
cd meetique
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
# Edit .env.local with your values
```

4. **Set up the database**

```bash
# Run database migrations
pnpm db:migrate

# Optional: Open Drizzle Studio to view database
pnpm db:studio
```

5. **Start the development server**

```bash
# Start all development services
pnpm dev

# Or start individual services
pnpm dev:web      # Next.js development server
pnpm dev:inngest  # Inngest background jobs
pnpm dev:webhook  # Webhook tunnel with ngrok
```

6. **Open the application**

```bash
http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── api/               # API routes
│   └── call/              # Video calling pages
├── components/            # Reusable UI components
│   └── ui/                # shadcn/ui components
├── db/                    # Database configuration
│   ├── schema.ts          # Database schema
│   └── migrations/        # Database migrations
├── hooks/                 # Custom React hooks
├── inngest/               # Background job functions
├── lib/                   # Utility libraries
├── modules/               # Feature modules
│   ├── agents/            # AI agents functionality
│   ├── auth/              # Authentication
│   ├── call/              # Video calling
│   ├── dashboard/         # Dashboard components
│   ├── meetings/          # Meeting management
│   └── premium/           # Subscription features
└── trpc/                  # tRPC configuration
```

## 🎯 Key Modules

### Agents Module

- **Purpose**: Manage AI agents with custom instructions
- **Features**: Create, update, delete agents; agent-specific meeting history
- **Location**: `src/modules/agents/`

### Meetings Module

- **Purpose**: Schedule and manage meetings with AI agents
- **Features**: Create meetings, video calling, transcription, summaries
- **Location**: `src/modules/meetings/`

### Call Module

- **Purpose**: Real-time video calling functionality
- **Features**: Video/audio controls, screen sharing, real-time transcription
- **Location**: `src/modules/call/`

### Premium Module

- **Purpose**: Subscription management and premium features
- **Features**: Pricing tiers, usage limits, billing management
- **Location**: `src/modules/premium/`

## 🔄 Development Workflow

### Database Operations

```bash
# Generate new migration after schema changes
pnpm db:generate

# Apply migrations to database
pnpm db:migrate

# Push schema changes directly (development only)
pnpm db:push

# Open Drizzle Studio
pnpm db:studio
```

### Code Quality

```bash
# Run type checking
pnpm typecheck

# Run linting
pnpm lint:check
pnpm lint:fix

# Run formatting
pnpm format:check
pnpm format:fix
```

### Testing

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect your repository to Vercel**
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Environment Variables for Production

Ensure all environment variables are set in your Vercel project:

- Update `POLAR_SERVER` to `"production"`
- Use production database URL
- Use production OAuth app credentials
- Set up proper domain URLs

### Database Migrations

```bash
# Run migrations in production
pnpm db:migrate
```

## 📊 Database Schema

### Core Tables

- **users**: User accounts and profiles
- **sessions**: Authentication sessions
- **accounts**: Social authentication accounts
- **agents**: AI agents with custom instructions
- **meetings**: Meeting records with status and metadata

### Meeting Statuses

- `upcoming`: Meeting scheduled but not started
- `active`: Meeting currently in progress
- `completed`: Meeting finished successfully
- `processing`: Meeting being processed for summary
- `cancelled`: Meeting cancelled

## 🔐 Authentication Flow

1. **Sign Up/Sign In**: Email/password or social OAuth
2. **Session Management**: Better Auth handles session creation
3. **Authorization**: tRPC middleware checks authentication
4. **Premium Features**: Polar integration for subscription management

## 🎥 Video Calling Architecture

1. **Meeting Creation**: Creates Stream Video call with custom metadata
2. **Agent Setup**: Upserts AI agent as Stream Video user
3. **Real-time Connection**: Stream Video WebRTC for video/audio
4. **AI Integration**: OpenAI Realtime API for AI agent interaction
5. **Transcription**: Automatic via Stream Video transcription service

## 📝 AI Summarization Process

1. **Meeting Ends**: Webhook triggers processing
2. **Transcript Fetch**: Download transcript from Stream Video
3. **Speaker Identification**: Match speaker IDs to users/agents
4. **AI Processing**: GPT-4 generates structured summary
5. **Summary Storage**: Store in database and display to user

## 🛡 Security Features

- **Authentication**: Secure session management with Better Auth
- **Authorization**: tRPC middleware for route protection
- **Input Validation**: Zod schemas for all inputs
- **CORS**: Configured trusted origins
- **Webhook Security**: Signature verification for webhooks

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first responsive layout
- **Dark Mode**: System preference with manual toggle
- **Accessibility**: WCAG compliant with Radix UI
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: Comprehensive error boundaries and toast notifications

## 📱 PWA Features

- **Manifest**: Web app manifest for installation
- **Icons**: Adaptive icons for different platforms
- **Offline Support**: Basic offline functionality

## 🔄 Background Jobs

Uses Inngest for reliable background processing:

- **Meeting Processing**: Transcript fetching and AI summarization
- **Webhook Handling**: Process Stream Video webhooks
- **Cleanup Tasks**: Data maintenance and cleanup

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the existing code style
4. **Run tests**: `pnpm typecheck && pnpm lint:check`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

## 📝 Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Extended Next.js configuration
- **Prettier**: Consistent code formatting
- **Import Organization**: Automatic import sorting
- **Naming Conventions**: camelCase for variables, PascalCase for components

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure DATABASE_URL is correct
2. **Stream Video**: Check API keys and video setup
3. **Authentication**: Verify OAuth app configuration
4. **Build Errors**: Run `pnpm typecheck` to identify issues

### Debug Mode

```bash
# Enable debug logging
DEBUG=* pnpm dev
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contributing

This project welcomes contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started. All contributions require maintainer approval to ensure project quality and direction.

## 📚 Documentation

- **[Setup Guide](docs/setup.md)** - Detailed environment setup instructions
- **[Architecture](docs/architecture.md)** - System architecture and design
- **[Security Guide](docs/security.md)** - Security best practices and vulnerability reporting
- **[Troubleshooting](docs/troubleshooting.md)** - Common issues and solutions
- **[Contributing](CONTRIBUTING.md)** - How to contribute to the project
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community guidelines
- **[License](LICENSE)** - MIT License details

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs)
- [Stream Video Documentation](https://getstream.io/video/docs/)
- [Better Auth Documentation](https://better-auth.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
