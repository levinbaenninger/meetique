# 🔒 Security Guide

This document outlines security considerations, best practices, and policies for the Meetique project. As a platform handling video calls, user data, and payments, security is paramount.

## 🚨 Reporting Security Vulnerabilities

### 🔴 Critical Issues

For **critical security vulnerabilities** that could affect user data or system integrity:

1. **DO NOT** open a public GitHub issue
2. **Email directly**: [levin@levinbaenninger.dev](mailto:levin@levinbaenninger.dev)
3. **Subject line**: `[SECURITY] Meetique Vulnerability Report`
4. **Include**: Detailed description, steps to reproduce, potential impact

### Response Timeline

- **Acknowledgment**: Within 24 hours
- **Initial Assessment**: Within 48 hours
- **Status Updates**: Every 72 hours until resolved
- **Resolution**: Target 7 days for critical issues

### 🔄 Process

1. **Triage**: We assess the severity and impact
2. **Fix Development**: We develop and test a fix
3. **Disclosure**: We coordinate disclosure timing with you
4. **Credit**: We provide attribution if desired

## 🛡️ Security Architecture

### 🔐 Authentication & Authorization

#### Authentication Providers

- **Better Auth**: Secure session management with industry standards
- **OAuth Integration**: GitHub and Google OAuth with proper scopes
- **Magic Links**: Passwordless authentication via secure email links

#### Authorization Layers

```typescript
// tRPC middleware ensures authenticated access
export const withAuth = middleware(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { ...ctx, session } });
});
```

### 🗄️ Database Security

#### Connection Security

- **SSL/TLS**: Required for all database connections
- **Connection Pooling**: Secure connection management with Drizzle
- **Environment Variables**: Database credentials in secure environment variables

#### Data Protection

- **Input Validation**: Zod schemas for all inputs
- **SQL Injection Prevention**: Parameterized queries via Drizzle ORM
- **Data Encryption**: Sensitive data encrypted at rest
- **Access Controls**: Role-based access to database operations

#### Schema Security

```sql
-- User data with proper constraints
CREATE TABLE "user" (
  "id" text PRIMARY KEY NOT NULL,
  "email" text NOT NULL UNIQUE,
  "email_verified" boolean NOT NULL DEFAULT false,
  -- Additional security columns
);
```

### 🎥 Video Call Security

#### Stream Video Integration

- **API Key Security**: Separate public/private key management
- **Call Permissions**: User-based call access controls
- **Recording Security**: Encrypted storage of call recordings

#### Real-time Communication

- **WebRTC Security**: Encrypted peer-to-peer communication
- **STUN/TURN**: Secure relay servers for connection establishment
- **Transcript Security**: Encrypted transcript storage and processing

### 💳 Payment Security

#### Polar Integration

- **PCI Compliance**: Polar handles PCI-compliant payment processing
- **Webhook Security**: Signed webhooks with verification
- **API Key Management**: Secure API key storage and rotation
- **Transaction Logging**: Secure audit trails for all transactions

## 🔧 Implementation Security

### 🌐 API Security

#### tRPC Security

- **Type Safety**: Runtime type checking with Zod
- **Rate Limiting**: Prevent abuse with request throttling
- **Input Sanitization**: All inputs validated and sanitized
- **Error Handling**: Secure error messages without data leakage

#### Arcjet Security

- **Bot Protection**: Advanced bot detection with allow/deny lists
- **Shield Protection**: Multi-layered security against common attacks
- **Rate Limiting**: Token bucket and sliding window algorithms
- **Email Validation**: Blocks disposable and invalid email addresses
- **IP Analysis**: Intelligent IP reputation and geolocation analysis

#### Webhook Security

```typescript
// Signature verification for Stream Video webhooks
const signature = request.headers.get('x-signature');
if (!verifySignatureWithSdk(body, signature)) {
  return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
}
```

#### CORS Configuration

```typescript
// Trusted origins configuration
export const TRUSTED_ORIGINS = getTrustedOrigins();
// Prevents unauthorized cross-origin requests
```

### 🔒 Environment Security

#### Secret Management

- **Production**: Use platform-specific secret management (Vercel Environment Variables)
- **Development**: Use `.env` files (never commit to git)
- **Staging**: Separate environment variables for each deployment stage

### 🏗️ Infrastructure Security

#### Deployment Security

- **HTTPS Only**: All production traffic over HTTPS
- **Security Headers**: Proper security headers configuration
- **Asset Security**: Secure asset delivery via CDN
- **Build Security**: Secure build and deployment pipeline

#### Next.js Security

```typescript
// Security headers configuration
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
];
```

#### Sentry Security

- **Data Scrubbing**: Automatic removal of sensitive data from error reports
- **Sample Rate Control**: Configurable sampling to prevent data overexposure
- **Access Controls**: Team-based access to error data
- **Data Retention**: Configurable retention periods for error data
- **Tunnel Route**: Ad-blocker circumvention without exposing DSN

## 🔍 Security Monitoring

### 📊 Logging & Monitoring

#### Security Events

- **Authentication Events**: Login attempts, failures, successes
- **Authorization Events**: Access denials, privilege escalations
- **API Events**: Rate limiting, suspicious requests
- **Payment Events**: Transaction attempts, failures
- **Security Events**: Arcjet protection triggers, bot detections
- **User Behavior**: PostHog analytics for anomaly detection

#### Error Tracking

- **Sentry Integration**: Real-time error tracking with detailed context
- **Structured Logging**: Consistent log format for security events
- **Error Monitoring**: Comprehensive error monitoring with stack traces
- **Alert System**: Automated alerts for security incidents via Sentry
- **Audit Trails**: Comprehensive audit logs for compliance

### 🚨 Incident Response

#### Detection

- **Automated Monitoring**: Real-time detection of security events
- **Anomaly Detection**: Unusual user behavior patterns
- **Performance Monitoring**: Resource usage anomalies
- **External Monitoring**: Third-party security scanning

#### Response Process

1. **Immediate**: Stop ongoing attack, preserve evidence
2. **Assessment**: Determine scope and impact
3. **Containment**: Limit damage and prevent spread
4. **Recovery**: Restore normal operations
5. **Lessons Learned**: Post-incident analysis and improvements

## 🎯 Security Best Practices

### 👨‍💻 For Developers

#### Authentication Checks

- **Always verify authentication** for protected routes
- **Check authorization** for resource access
- **Validate user permissions** for sensitive operations
- **Log security events** for audit purposes

### 🚀 For Deployment

#### Environment Security

- **Separate environments** for development, staging, production
- **Environment-specific secrets** with proper access controls
- **Monitoring and alerting** for all environments

#### CI/CD Security

- **Dependency scanning** for known vulnerabilities
- **Static code analysis** for security issues
- **Secret scanning** to prevent credential leaks

### 👥 For Users

#### Account Security

- **Magic link authentication** for passwordless security
- **Secure email delivery** via trusted email providers
- **Secure OAuth providers** for social authentication

## 🔐 Data Protection

### 📊 Data Classification

#### Sensitive Data

- **PII**: Email addresses, names, profile information
- **Authentication**: Session tokens, API keys, magic link tokens
- **Financial**: Payment information, subscription details
- **Communication**: Meeting transcripts, recordings, summaries

#### Data Handling

- **Encryption at Rest**: All sensitive data encrypted in database
- **Encryption in Transit**: TLS 1.3 for all API communications
- **Access Controls**: Role-based access to sensitive operations
- **Data Minimization**: Collect only necessary information

### 🌍 Privacy Compliance

#### GDPR Compliance

- **Data Subject Rights**: Right to access, rectify, delete personal data
- **Consent Management**: Clear consent for data processing
- **Data Portability**: Ability to export user data
- **Privacy by Design**: Privacy considerations in all features

#### Data Retention

- **Retention Policies**: Clear policies for data retention periods
- **Automatic Deletion**: Automated cleanup of expired data
- **User Control**: Users can delete their own data
- **Backup Security**: Encrypted backups with access controls

## 🛠️ Security Tools & Dependencies

### 📦 Dependency Security

#### Dependency Management

```bash
# Regular security audits
pnpm audit
pnpm audit --fix

# Dependency updates
pnpm update

# Security scanning
npm audit --audit-level moderate
```

#### Known Vulnerabilities

- **Regular scanning** with `pnpm audit`
- **Automated updates** for security patches
- **Dependency pinning** for reproducible builds
- **License compliance** checking

### 🔧 Security Tools

#### Development Tools

- **ESLint Security Plugin**: Static analysis for security issues
- **TypeScript Strict Mode**: Type safety to prevent runtime errors
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for security checks

#### Monitoring Tools

- **Sentry**: Error tracking, performance monitoring, and session replay
- **Vercel Analytics**: Performance and error monitoring
- **Database Monitoring**: Connection and query monitoring
- **API Monitoring**: Request tracking and rate limiting
- **Uptime Monitoring**: Service availability tracking

## 📋 Security Checklist

### ✅ Pre-Deployment Security Review

#### Code Review

- [ ] All inputs validated with Zod schemas
- [ ] Authentication required for protected routes
- [ ] Authorization checked for resource access
- [ ] Error messages don't leak sensitive information
- [ ] API keys and secrets properly managed
- [ ] SQL injection prevention verified
- [ ] XSS prevention measures in place

#### Infrastructure Review

- [ ] HTTPS enforced for all traffic
- [ ] Security headers configured
- [ ] Environment variables secured
- [ ] Database connections encrypted
- [ ] Webhook signatures verified
- [ ] Rate limiting implemented
- [ ] CORS properly configured

#### Third-Party Integration Review

- [ ] Stream Video security configuration verified
- [ ] OpenAI API key permissions minimal
- [ ] Polar webhook security implemented
- [ ] OAuth redirect URIs validated
- [ ] External API calls use HTTPS
- [ ] API rate limits respected
- [ ] Error handling for external failures

### 📊 Ongoing Security Maintenance

#### Regular Tasks

- [ ] **Weekly**: Dependency security audits
- [ ] **Monthly**: Security log reviews
- [ ] **Quarterly**: Access permission audits
- [ ] **Annually**: Full security assessment

#### Incident Preparedness

- [ ] Incident response plan documented
- [ ] Emergency contact information updated
- [ ] Backup and recovery procedures tested
- [ ] Security team training completed

## 📞 Security Contacts

### 🚨 Emergency Contacts

- **Security Issues**: [levin@levinbaenninger.dev](mailto:levin@levinbaenninger.dev)
- **Project Maintainer**: Levin Bänninger
- **Response Time**: 24 hours for critical issues

### 📋 Security Resources

- **Security Policy**: This document
- **Code of Conduct**: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- **Contributing Guidelines**: [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Issue Templates**: [ISSUE_TEMPLATE/](./ISSUE_TEMPLATE/)

## 🔗 External Security Resources

### 📚 Security Standards

- **OWASP Top 10**: [https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)
- **NIST Cybersecurity Framework**: [https://www.nist.gov/cyberframework](https://www.nist.gov/cyberframework)
- **CIS Controls**: [https://www.cisecurity.org/controls/](https://www.cisecurity.org/controls/)

### 🛡️ Service Security Documentation

- **Vercel Security**: [https://vercel.com/security](https://vercel.com/security)
- **Neon Security**: [https://neon.tech/security](https://neon.tech/security)
- **Stream Security**: [https://getstream.io/security/](https://getstream.io/security/)
- **OpenAI Security**: [https://openai.com/security/](https://openai.com/security/)

---

**Security is everyone's responsibility. When in doubt, ask questions and err on the side of caution. 🔒**
