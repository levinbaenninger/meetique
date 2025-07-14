# 🔍 Troubleshooting Guide

This guide helps you diagnose and fix common issues when developing with Meetique.

## 🚨 Common Issues & Solutions

### 🗄️ Database Issues

#### "Database connection failed"

**Problem**: Cannot connect to PostgreSQL database

**Solutions**:

1. **Check DATABASE_URL format**:

   ```bash
   # Correct format for Neon
   DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
   ```

2. **Verify database is running**:

   ```bash
   # Test connection with Drizzle Studio
   pnpm db:studio
   ```

3. **Check network connectivity**:
   ```bash
   # Test database connection
   psql "postgresql://username:password@host/database?sslmode=require"
   ```

#### "Migration failed"

**Problem**: Database migrations are not applying

**Solutions**:

1. **Reset migrations**:

   ```bash
   # Drop database and recreate
   pnpm db:push --force
   ```

2. **Check migration files**:

   ```bash
   # Verify migration files exist
   ls src/db/migrations/
   ```

3. **Manual migration**:
   ```bash
   # Run specific migration
   pnpm db:migrate --to=0001
   ```

### 🔐 Authentication Issues

#### "OAuth callback error"

**Problem**: GitHub/Google OAuth not working

**Solutions**:

1. **Check callback URLs**:

   - GitHub: `http://localhost:3000/api/auth/callback/github`
   - Google: `http://localhost:3000/api/auth/callback/google`

2. **Verify environment variables**:

   ```bash
   # Check if variables are set
   echo $GITHUB_CLIENT_ID
   echo $GITHUB_CLIENT_SECRET
   ```

3. **Check OAuth app configuration**:
   - Ensure OAuth app is enabled
   - Verify client ID and secret are correct

#### "Session expired" or "Unauthorized"

**Problem**: User sessions are not persisting

**Solutions**:

1. **Check Better Auth configuration**:

   ```bash
   # Verify auth configuration
   cat src/lib/auth.ts
   ```

2. **Clear browser cookies**:

   - Delete all cookies for localhost:3000
   - Try incognito/private browsing

3. **Check database sessions table**:
   ```bash
   # Open database studio
   pnpm db:studio
   # Check sessions table
   ```

### 🎥 Stream Video Issues

#### "Video call not connecting"

**Problem**: Video calls fail to establish

**Solutions**:

1. **Check Stream API keys**:

   ```bash
   # Verify environment variables
   echo $NEXT_PUBLIC_STREAM_VIDEO_API_KEY
   echo $STREAM_VIDEO_API_SECRET
   ```

2. **Check browser permissions**:

   - Allow camera and microphone access
   - Check browser developer tools for errors

3. **Verify Stream app configuration**:
   - Ensure Stream app is active
   - Check API key permissions

#### "Webhook not receiving events"

**Problem**: Stream webhooks not triggering

**Solutions**:

1. **Check webhook URL**:

   ```bash
   # Verify ngrok is running
   pnpm dev:webhook
   # Check webhook URL in Stream dashboard
   ```

2. **Verify webhook events**:

   - Enable required events in Stream dashboard
   - Check webhook signature verification

3. **Debug webhook payload**:
   ```bash
   # Check webhook route
   tail -f .next/server.log
   ```

### 🤖 OpenAI Issues

#### "OpenAI API key invalid"

**Problem**: AI summarization not working

**Solutions**:

1. **Check API key format**:

   ```bash
   # Should start with sk-
   echo $OPENAI_API_KEY | head -c 10
   ```

2. **Verify billing status**:

   - Check OpenAI dashboard billing
   - Ensure usage limits are not exceeded

3. **Test API key**:
   ```bash
   # Test with curl
   curl -H "Authorization: Bearer $OPENAI_API_KEY" \
        "https://api.openai.com/v1/models"
   ```

#### "Rate limit exceeded"

**Problem**: Too many OpenAI API calls

**Solutions**:

1. **Check usage limits**:

   - Review OpenAI dashboard usage
   - Increase rate limits if needed

2. **Implement retry logic**:
   - Add exponential backoff
   - Queue requests

### 💳 Polar Payment Issues

#### "Polar checkout not working"

**Problem**: Subscription checkout fails

**Solutions**:

1. **Check Polar configuration**:

   ```bash
   # Verify environment variables
   echo $POLAR_ACCESS_TOKEN
   echo $POLAR_SERVER
   ```

2. **Verify products exist**:

   - Check Polar dashboard for products
   - Ensure products are active

3. **Test webhook endpoint**:
   ```bash
   # Check webhook URL is accessible
   curl -X POST http://localhost:3000/api/webhook
   ```

### 🚀 Build & Deployment Issues

#### "Build failed"

**Problem**: Next.js build errors

**Solutions**:

1. **Check TypeScript errors**:

   ```bash
   # Run type checking
   pnpm typecheck
   ```

2. **Check ESLint errors**:

   ```bash
   # Run linting
   pnpm lint:check
   ```

3. **Clear build cache**:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   pnpm build
   ```

#### "Environment variables not available"

**Problem**: Environment variables not loading in production

**Solutions**:

1. **Check deployment platform**:

   - Verify environment variables are set in Vercel/deployment platform
   - Ensure variable names match exactly

2. **Check variable prefix**:

   - Client-side variables need `NEXT_PUBLIC_` prefix
   - Server-side variables don't need prefix

3. **Test locally**:
   ```bash
   # Test production build locally
   pnpm build
   pnpm start
   ```

### 🔍 Sentry Issues

#### "Sentry not capturing errors"

**Problem**: Errors not appearing in Sentry dashboard

**Solutions**:

1. **Check DSN configuration**:

   ```bash
   # Verify DSN is set
   echo $NEXT_PUBLIC_SENTRY_DSN
   ```

2. **Verify environment**:

   ```bash
   # Check if Sentry is initialized
   # Look for Sentry initialization in browser console
   ```

3. **Test error capture**:
   ```bash
   # Add to any component
   import * as Sentry from '@sentry/nextjs';
   Sentry.captureException(new Error('Test error'));
   ```

#### "High error volume in Sentry"

**Problem**: Too many errors being captured

**Solutions**:

1. **Adjust sample rates**:

   ```typescript
   // In sentry config files
   tracesSampleRate: 0.1, // Reduce to 10%
   replaysSessionSampleRate: 0.1,
   ```

2. **Filter out known errors**:

   ```typescript
   // Add to Sentry config
   beforeSend(event) {
     // Filter out specific errors
     if (event.exception) {
       const error = event.exception.values?.[0];
       if (error?.type === 'ChunkLoadError') {
         return null;
       }
     }
     return event;
   }
   ```

3. **Set up error boundaries**:
   ```typescript
   // Use React error boundaries to catch and handle errors
   ```

#### "Source maps not uploading"

**Problem**: Stack traces not showing original source code

**Solutions**:

1. **Check build configuration**:

   ```bash
   # Verify Sentry webpack plugin is configured
   # Check next.config.ts
   ```

2. **Verify auth token**:

   ```bash
   # Check if SENTRY_AUTH_TOKEN is set for CI/CD
   ```

3. **Manual source map upload**:
   ```bash
   # Upload source maps manually
   npx @sentry/cli sourcemaps upload --org your-org --project your-project .next/static/
   ```

### 🔧 Development Issues

#### "pnpm dev not working"

**Problem**: Development server won't start

**Solutions**:

1. **Check Node.js version**:

   ```bash
   node --version  # Should be 18+
   ```

2. **Clear node_modules**:

   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

3. **Check port availability**:
   ```bash
   # Check if port 3000 is in use
   lsof -i :3000
   ```

#### "Hot reload not working"

**Problem**: Changes not reflecting in browser

**Solutions**:

1. **Check file watcher limits**:

   ```bash
   # Increase file watcher limit (Linux)
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

2. **Restart development server**:

   ```bash
   # Stop and restart
   pnpm dev
   ```

3. **Check browser cache**:
   - Hard refresh (Ctrl+Shift+R)
   - Disable cache in dev tools

## 🔧 Debugging Tools

### 1. **Database Debugging**

```bash
# Open Drizzle Studio
pnpm db:studio

# Check database logs
DEBUG=drizzle:* pnpm dev
```

### 2. **API Debugging**

```bash
# Enable tRPC debugging
DEBUG=trpc:* pnpm dev

# Check API logs
tail -f .next/server.log
```

### 3. **Authentication Debugging**

```bash
# Enable auth debugging
DEBUG=better-auth:* pnpm dev

# Check auth logs
console.log(session) // Add to components
```

### 4. **Video Debugging**

```bash
# Enable Stream Video debugging
DEBUG=stream-video:* pnpm dev

# Check browser console for WebRTC errors
```

### 5. **Background Jobs Debugging**

```bash
# Enable Inngest debugging
DEBUG=inngest:* pnpm dev:inngest

# Check Inngest dashboard
```

### 6. **Sentry Debugging**

```bash
# Enable Sentry debugging
DEBUG=sentry:* pnpm dev

# Check Sentry dashboard
# https://sentry.io/organizations/your-org/projects/

# Test error capture
console.error('Test error for Sentry')
```

## 🚨 Emergency Fixes

### 1. **Reset Database**

```bash
# ⚠️ This will delete all data
pnpm db:push --force
```

### 2. **Reset Authentication**

```bash
# Clear all sessions
# Run in database studio:
# DELETE FROM sessions;
```

### 3. **Reset Stream Video**

```bash
# Disable all calls
# Go to Stream dashboard > Calls > End all
```

### 4. **Reset Environment**

```bash
# Start fresh
rm -rf node_modules .next pnpm-lock.yaml
pnpm install
```

## 📞 Getting Help

### Before Asking for Help

1. **Check this troubleshooting guide**
2. **Search existing GitHub issues**
3. **Check service status pages**:
   - [Neon Status](https://status.neon.tech/)
   - [Stream Status](https://status.getstream.io/)
   - [OpenAI Status](https://status.openai.com/)
   - [Vercel Status](https://vercel-status.com/)
   - [Sentry Status](https://status.sentry.io/)

### How to Ask for Help

1. **Open a GitHub issue** with the bug report template
2. **Include relevant logs** and error messages
3. **Describe steps to reproduce** the issue
4. **Include environment information**:
   - OS version
   - Node.js version
   - pnpm version
   - Browser (if applicable)

### Debug Information to Include

```bash
# System info
node --version
pnpm --version
git --version

# Environment check
echo $NODE_ENV
echo $DATABASE_URL | head -c 20  # Don't share full URL

# Package versions
pnpm list --depth=0
```

## 🎯 Prevention Tips

### 1. **Regular Maintenance**

- Keep dependencies updated
- Monitor service status pages
- Regular database backups
- Test deployments in staging

### 2. **Development Best Practices**

- Use TypeScript strictly
- Write tests for critical paths
- Monitor error logs
- Use environment variable validation

### 3. **Monitoring**

- Monitor Sentry dashboard for errors and performance
- Set up Sentry alerts for critical issues
- Monitor API usage limits
- Track performance metrics with Sentry performance monitoring
- Set up alerts for failures

---

**Still having issues? Open a GitHub issue and we'll help you out! 🚀**
