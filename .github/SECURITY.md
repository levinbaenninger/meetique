# Security Policy

Security considerations and reporting procedures for Meetique.

## Reporting Security Vulnerabilities

- **DO NOT** open public GitHub issues for security vulnerabilities.

- **Report via email**: [levin@baenninger.me](mailto:levin@baenninger.me)

- **Subject**: `[SECURITY] Meetique Vulnerability Report`

**Include**:

- Detailed description
- Steps to reproduce
- Potential impact
- Proof of concept (if applicable)

### Response Timeline

- Acknowledgment: Within 24 hours
- Initial assessment: Within 48 hours
- Status updates: Every 72 hours until resolved
- Target resolution: 7 days for critical issues

### Disclosure Process

1. Maintainer triages and assesses severity
2. Fix is developed and tested
3. Coordinated disclosure timing
4. Security advisory published
5. Credit provided to reporter (if desired)

## Security Architecture

### Authentication

- Better Auth for session management
- OAuth integration (GitHub, Google)
- Magic link passwordless authentication
- Session-based authorization via tRPC middleware

### Database

- SSL/TLS required for all connections
- Parameterized queries via Drizzle ORM
- Input validation with Zod schemas
- Encrypted sensitive data at rest

### Video Calls

- Encrypted WebRTC communication
- Stream Video with API key separation
- Encrypted recording and transcript storage
- User-based call access controls

### Payments

- PCI-compliant processing via Polar
- Signed webhook verification
- Secure API key management
- Transaction audit logging

### API Security

- Runtime type checking with Zod
- Rate limiting and throttling
- Arcjet bot protection and email validation
- CORS configuration for trusted origins
- Webhook signature verification

### Infrastructure

- HTTPS enforced in production
- Security headers configured
- Environment-based secret management
- Sentry error tracking with data scrubbing

## Security Best Practices

### Development

- Verify authentication for protected routes
- Check authorization for resource access
- Validate all user inputs
- Use environment variables for secrets
- Log security events for audit trails

### Deployment

- Separate environments (dev, staging, production)
- Environment-specific secrets
- Regular dependency security audits
- Static code analysis
- Secret scanning in CI/CD

### Dependencies

```bash
bun audit              # Security audit
bun update             # Update dependencies
```

## Data Protection

### Sensitive Data Types

- Personal information (email, name, profile)
- Authentication tokens and API keys
- Payment and subscription information
- Meeting transcripts and recordings

### Security Measures

- Encryption at rest and in transit (TLS 1.3)
- Role-based access controls
- Data minimization principles
- GDPR compliance (data subject rights, consent management)
- Configurable retention policies

## Security Checklist

### Pre-Deployment

- [ ] All inputs validated with Zod
- [ ] Authentication required for protected routes
- [ ] Authorization checked for resource access
- [ ] Secrets in environment variables
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Webhook signatures verified
- [ ] Rate limiting implemented

### Ongoing Maintenance

- [ ] Weekly: Dependency audits
- [ ] Monthly: Security log reviews
- [ ] Quarterly: Access permission audits
- [ ] Annually: Full security assessment

## Contact

- **Security Issues**: [levin@baenninger.me](mailto:levin@baenninger.me)
- **Maintainer**: Levin Bänninger
- **Response Time**: 24 hours for critical issues

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Better Auth Docs](https://better-auth.com/docs)
- [Stream Security](https://getstream.io/security/)
- [Polar Docs](https://docs.polar.sh/)
- [Sentry Security](https://docs.sentry.io/)

---

Security is everyone's responsibility.
