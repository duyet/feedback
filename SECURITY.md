# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| < 0.1   | :x:                |

## Security Features

This project implements comprehensive security measures:

### 🔒 Application Security

- **HTTP Method Validation**: All API routes validate HTTP methods
- **Rate Limiting**: Protection against DoS and spam attacks
- **CORS Configuration**: Secure cross-origin requests with origin validation
- **Input Validation**: Email format, message length limits, SQL injection prevention
- **Authorization Checks**: Proper ownership verification on all protected resources
- **Error Handling**: Graceful error handling without exposing sensitive information
- **Production Hardening**: Debug mode disabled in production environments

### 🛡️ Data Protection

- **Prisma ORM**: Parameterized queries prevent SQL injection
- **Session Management**: NextAuth.js with secure cookie handling
- **Password Storage**: OAuth-based authentication (no password storage)
- **HTTPS Enforcement**: SSL/TLS in production (recommended)

### 🔐 Authentication & Authorization

- **OAuth Support**: GitHub and Google OAuth providers
- **Session-Based Auth**: Secure server-side session management
- **Role-Based Access**: Project-level permissions (owner, member)
- **Invitation System**: Secure email-based team invitations

### 📊 Monitoring & Logging

- **Health Check Endpoint**: `/api/health` for monitoring
- **Error Logging**: Development-only error logging (no production logs)
- **Audit Trail**: Consider implementing for sensitive operations

## Reporting a Vulnerability

**DO NOT** disclose security vulnerabilities publicly.

### How to Report

1. **Email**: Send details to security@[your-domain].com (replace with actual email)
2. **Include**:
   - Type of vulnerability
   - Full paths of source files related to the issue
   - Location of affected source code (tag/branch/commit)
   - Step-by-step instructions to reproduce
   - Proof-of-concept or exploit code (if possible)
   - Impact assessment

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Assessment**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 7-30 days
  - Medium: 30-90 days
  - Low: 90+ days

### Vulnerability Severity

We use the CVSS v3.0 rating system:

- **Critical** (9.0-10.0): Immediate attention required
- **High** (7.0-8.9): Priority fix
- **Medium** (4.0-6.9): Scheduled fix
- **Low** (0.1-3.9): Best effort

## Security Best Practices for Contributors

### Code Review Checklist

Before submitting code, ensure:

- [ ] No secrets or credentials in code
- [ ] Input validation on all user inputs
- [ ] Authorization checks where needed
- [ ] Rate limiting on public endpoints
- [ ] SQL injection prevention (use Prisma)
- [ ] XSS prevention (sanitize outputs)
- [ ] CSRF protection (HTTP method validation)
- [ ] Error messages don't leak sensitive info

### Common Vulnerabilities to Avoid

#### ❌ SQL Injection
```typescript
// Bad
const query = `SELECT * FROM users WHERE id = ${userId}`;

// Good
const user = await prisma.user.findUnique({ where: { id: userId } });
```

#### ❌ XSS (Cross-Site Scripting)
```typescript
// Bad
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Good
<div>{userInput}</div> // React automatically escapes
```

#### ❌ CSRF (Cross-Site Request Forgery)
```typescript
// Bad
export default async function handler(req, res) {
  // No method validation
  await deleteUser(req.query.id);
}

// Good
export default async function handler(req, res) {
  if (!validateMethod(req, res, ['DELETE'])) return;
  await deleteUser(req.query.id);
}
```

#### ❌ Sensitive Data Exposure
```typescript
// Bad
console.log(user); // May contain sensitive data
res.json(user); // Exposes all fields

// Good
const { password, ...safeUser } = user;
res.json(safeUser);
```

## Dependencies

### Security Updates

We use:
- **Renovate Bot**: Automated dependency updates
- **GitHub Dependabot**: Security alerts
- **npm audit**: Regular security audits

### Updating Dependencies

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Check for outdated packages
yarn outdated

# Update specific package
yarn upgrade package-name
```

## Deployment Security

### Environment Variables

Never commit:
- API keys
- Database credentials
- OAuth secrets
- Session secrets

Use:
- `.env.local` for local development
- Environment variables in production
- Secrets management systems (recommended)

### Production Checklist

- [ ] HTTPS enabled
- [ ] NEXTAUTH_SECRET set to strong random value
- [ ] Database SSL connection enabled
- [ ] Debug mode disabled
- [ ] Error details hidden from users
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Security headers set (CSP, X-Frame-Options, etc.)

### Recommended Security Headers

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};
```

## Security Monitoring

### Recommended Tools

- **Sentry**: Error monitoring
- **LogRocket**: Session replay
- **Datadog**: Application monitoring
- **Snyk**: Vulnerability scanning

### Health Checks

Monitor `/api/health` endpoint for:
- Application uptime
- Database connectivity
- Response latency

## Contact

- **Security Issues**: security@[your-domain].com
- **General Questions**: support@[your-domain].com
- **GitHub Issues**: For non-security bugs only

## Acknowledgments

We appreciate security researchers who responsibly disclose vulnerabilities. Contributors will be acknowledged in release notes (with permission).

---

**Last Updated**: 2025-11-17
**Next Review**: 2026-01-17
