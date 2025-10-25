# Troubleshooting Guide

Common issues and solutions for Meetique development.

## Database Issues

**Connection failed**
- Verify `DATABASE_URL` format: `postgresql://user:pass@host/db?sslmode=require`
- Test with: `bun db:studio`

**Migration failed**
- Reset: `bun db:push --force` (WARNING: deletes all data)
- Check migration files exist: `ls src/db/migrations/`

## Authentication Issues

**OAuth callback error**
- Verify callback URLs:
  - GitHub: `http://localhost:3000/api/auth/callback/github`
  - Google: `http://localhost:3000/api/auth/callback/google`
- Check environment variables are set
- Ensure OAuth apps are enabled

**Session expired**
- Clear browser cookies
- Check database sessions table: `bun db:studio`

## Stream Video Issues

**Video call not connecting**
- Verify `NEXT_PUBLIC_STREAM_VIDEO_API_KEY` and `STREAM_VIDEO_API_SECRET`
- Check browser camera/microphone permissions
- Review browser console for errors

**Webhook not receiving events**
- Ensure ngrok is running: `bun dev:webhook`
- Verify webhook URL in Stream dashboard
- Check webhook signature verification

## OpenAI Issues

**API key invalid**
- Verify key format starts with `sk-`
- Check billing status at [OpenAI Dashboard](https://platform.openai.com/)
- Test key: `curl -H "Authorization: Bearer $OPENAI_API_KEY" https://api.openai.com/v1/models`

**Rate limit exceeded**
- Review usage in OpenAI dashboard
- Increase rate limits or implement retry logic

## Sentry Issues

**Errors not captured**
- Verify `NEXT_PUBLIC_SENTRY_DSN` is set
- Test: `Sentry.captureException(new Error('Test'))`
- Check project quotas in Sentry dashboard

**Source maps not working**
- Verify `SENTRY_AUTH_TOKEN` is set for builds
- Check build configuration includes Sentry webpack plugin

## Arcjet Issues

**Protection not working**
- Verify `ARCJET_KEY` is set
- Test rate limiting: `for i in {1..10}; do curl http://localhost:3000/api/arcjet; done`
- Check Arcjet dashboard for events

## PostHog Issues

**Events not appearing**
- Verify `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`
- Check browser console for PostHog initialization
- Test: `posthog.capture('test_event')`

## Build & Deployment Issues

**Build failed**
- Run type checking: `bun typecheck`
- Check linting: `bun lint:check`
- Clear cache: `rm -rf .next && bun build`

**Environment variables not available**
- Client-side variables need `NEXT_PUBLIC_` prefix
- Verify variables are set in deployment platform
- Test locally: `bun build && bun start`

## Development Issues

**Dev server won't start**
- Check Node.js version: `node --version` (requires 18+)
- Clear dependencies: `rm -rf node_modules bun.lock && bun install`
- Check port availability: `lsof -i :3000`

**Hot reload not working**
- Restart dev server: `bun dev`
- Hard refresh browser: Ctrl+Shift+R
- Check file watcher limits (Linux): `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf`

## Debugging Tools

**Enable debug logging**
```bash
DEBUG=drizzle:* bun dev          # Database queries
DEBUG=trpc:* bun dev             # API calls
DEBUG=inngest:* bun dev:inngest  # Background jobs
SENTRY_DEBUG=1 bun dev           # Sentry
POSTHOG_DEBUG=1 bun dev          # PostHog
```

## Emergency Reset

```bash
# Reset database (WARNING: deletes all data)
bun db:push --force

# Reset environment
rm -rf node_modules .next bun.lock
bun install
```

## Getting Help

1. Check this guide and [Setup Guide](setup.md)
2. Search [GitHub Issues](https://github.com/levinbaenninger/meetique/issues)
3. Check service status pages:
   - [Neon](https://status.neon.tech/)
   - [Stream](https://status.getstream.io/)
   - [OpenAI](https://status.openai.com/)
   - [Vercel](https://vercel-status.com/)
   - [Sentry](https://status.sentry.io/)

**Include when reporting issues:**
- Error messages and logs
- Steps to reproduce
- Environment: OS, Node version, Bun version
- Run: `bun typecheck && bun lint:check`

---

For further assistance, please open a GitHub issue with detailed information about your problem.
