# 🔧 Environment Setup Guide

This guide provides detailed step-by-step instructions for setting up all external services required for Meetique.

## 📋 Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **pnpm** - Install with `npm install -g pnpm`
- **Git** - [Download](https://git-scm.com/)

## 🗄️ Database Setup (Neon PostgreSQL)

### 1. Create Neon Account

1. Go to [Neon.tech](https://neon.tech/)
2. Sign up for a free account
3. Create a new project

### 2. Get Database URL

1. In your Neon dashboard, go to **Connection Details**
2. Copy the connection string (should look like this):
   ```
   postgresql://username:password@host/database?sslmode=require
   ```
3. Add to your `.env` file:
   ```bash
   DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
   ```

## 🔐 Authentication Setup

### GitHub OAuth

1. **Create GitHub OAuth App**

   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in the details:
     - **Application name**: Meetique Local
     - **Homepage URL**: `http://localhost:3000`
     - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
   - Click "Register application"

2. **Get Credentials**
   - Copy the **Client ID**
   - Generate a **Client Secret**
   - Add to your `.env` file:
     ```bash
     GITHUB_CLIENT_ID="your_client_id_here"
     GITHUB_CLIENT_SECRET="your_client_secret_here"
     ```

### Google OAuth

1. **Create Google Cloud Project**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Create OAuth Credentials**

   - Go to **APIs & Services > Credentials**
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
   - Click "Create"

3. **Get Credentials**
   - Copy the **Client ID** and **Client Secret**
   - Add to your `.env` file:
     ```bash
     GOOGLE_CLIENT_ID="your_client_id_here"
     GOOGLE_CLIENT_SECRET="your_client_secret_here"
     ```

## 🎥 Stream Video Setup

### 1. Create Stream Account

1. Go to [GetStream.io](https://getstream.io/)
2. Sign up for a free account
3. Create a new app

### 2. Get API Keys

1. In your Stream dashboard, go to **Dashboard > Your App**
2. Copy the **API Key** and **API Secret**
3. Add to your `.env` file:
   ```bash
   NEXT_PUBLIC_STREAM_VIDEO_API_KEY="your_api_key_here"
   STREAM_VIDEO_API_SECRET="your_api_secret_here"
   ```

### 3. Configure Webhooks

1. In Stream dashboard, go to **Video & Audio > Overview > Webhook & Event Configuration**
2. Add webhook URL: `https://decent-gently-cow.ngrok-free.app/api/webhook`
3. Enable all events

## 🤖 OpenAI Setup

### 1. Create OpenAI Account

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Add billing information (required for API access)

### 2. Get API Key

1. Go to **API Keys** section
2. Click "Create new secret key"
3. Copy the key and add to your `.env` file:
   ```bash
   OPENAI_API_KEY="sk-your_api_key_here"
   ```

### 3. Set Usage Limits (Recommended)

1. Go to **Settings > Billing > Usage limits**
2. Set a monthly limit to avoid unexpected charges
3. Set up email notifications for usage alerts

## 💳 Polar Setup (Payments)

### 1. Create Polar Account

1. Go to [Polar.sh](https://polar.sh/)
2. Sign up for an account
3. Complete your profile setup

### 2. Get Access Token

1. Go to **Settings > API Keys**
2. Create a new API key
3. Copy the token and add to your `.env` file:
   ```bash
   POLAR_ACCESS_TOKEN="your_access_token_here"
   POLAR_SERVER="sandbox"
   ```

### 3. Create Products (Optional)

1. Go to **Products** section
2. Create subscription tiers:
   - **Starter**: $15/month
   - **Pro**: $30/month
   - **Enterprise**: $200/month

## 🔍 Sentry Setup (Error Tracking)

### 1. Create Sentry Account

1. Go to [Sentry.io](https://sentry.io/)
2. Sign up for a free account
3. Create a new project

### 2. Get DSN (Data Source Name)

1. In your Sentry project dashboard, go to **Settings > Client Keys (DSN)**
2. Copy the **DSN** value
3. Add to your `.env` file:
   ```bash
   NEXT_PUBLIC_SENTRY_DSN="your_sentry_dsn_here"
   SENTRY_AUTH_TOKEN="your_sentry_auth_token_here"
   ```

## 🚀 Project Setup

### 1. Clone and Install

```bash
git clone https://github.com/levinbaenninger/meetique.git
cd meetique
pnpm install
```

### 2. Environment Variables

```bash
cp .env.example .env
# Edit .env with your actual values
```

### 3. Database Setup

```bash
# Run database migrations
pnpm db:migrate

# Optional: Open Drizzle Studio to view database
pnpm db:studio
```

### 4. Start Development

```bash
# Start all services
pnpm dev

# Or start individual services
pnpm dev:web      # Next.js app
pnpm dev:inngest  # Background jobs
pnpm dev:webhook  # Webhook tunnel
```

## 🧪 Testing Your Setup

### 1. Basic Application Test

- Visit `http://localhost:3000`
- Sign up with email/password
- Create a test agent
- Schedule a test meeting

### 2. OAuth Test

- Try signing in with GitHub
- Try signing in with Google
- Verify user data is saved correctly

### 3. Video Calling Test

- Join a test meeting
- Verify video/audio works
- Test screen sharing

### 4. Background Jobs Test

- End a meeting
- Verify transcript processing
- Check meeting summary generation

### 5. Error Tracking Test

- Trigger an intentional error
- Verify error appears in Sentry dashboard
- Check error details and context

## 🔍 Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Check if DATABASE_URL is correct
pnpm db:studio
# Should open Drizzle Studio
```

#### OAuth Issues

- Verify callback URLs match exactly
- Check that OAuth apps are configured correctly
- Ensure environment variables are set

#### Stream Video Issues

- Verify API keys are correct
- Check webhook URL configuration
- Ensure proper CORS settings

#### OpenAI Issues

- Verify API key is valid
- Check billing status
- Verify usage limits

#### Sentry Issues

- Verify DSN is correct format
- Check project settings and quotas
- Ensure errors are being captured

### Getting Help

- Check the [Troubleshooting Guide](troubleshooting.md)
- Open an issue on GitHub
- Check the [FAQ](faq.md)

## 🎯 Next Steps

After completing setup:

1. Read the [Development Workflow](development.md) guide
2. Review the [Contributing Guidelines](../CONTRIBUTING.md)
3. Explore the [Architecture Documentation](architecture.md)

---

**Setup complete! Happy coding! 🚀**
