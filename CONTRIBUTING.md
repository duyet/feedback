# Contributing to Feedback

🎉 Thank you for considering contributing to Feedback! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Security Guidelines](#security-guidelines)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

## Code of Conduct

This project follows a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Yarn package manager
- Docker (optional, for easier setup)

### Quick Setup with Docker

```bash
git clone https://github.com/duyet/feedback.git
cd feedback
docker-compose up -d
```

### Manual Setup

```bash
# Clone repository
git clone https://github.com/duyet/feedback.git
cd feedback/dashboard

# Install dependencies
yarn install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Setup database
yarn prisma migrate dev
yarn prisma db seed

# Start development server
yarn dev
```

## Development Workflow

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test thoroughly** - ensure nothing breaks
4. **Commit with semantic convention** (see below)
5. **Push to your fork** and submit a pull request

### Branch Naming

Use descriptive branch names:
- `feat/add-webhook-system` - For new features
- `fix/auth-vulnerability` - For bug fixes
- `docs/api-documentation` - For documentation
- `refactor/database-queries` - For refactoring
- `test/api-routes` - For adding tests

## Coding Standards

### TypeScript

- ✅ **Strict mode enabled** - No implicit any
- ✅ **Proper typing** - Avoid `any`, use specific types
- ✅ **Interfaces over types** - For object shapes
- ✅ **Async/await** - Prefer over promises

Example:
```typescript
// ❌ Bad
function getData(id: any) {
  return fetch(`/api/data/${id}`).then(r => r.json());
}

// ✅ Good
async function getData(id: string): Promise<Data> {
  const res = await fetch(`/api/data/${id}`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}
```

### API Routes

All API routes must include:
1. **HTTP method validation** using `validateMethod()`
2. **Authentication checks** (where required)
3. **Rate limiting** (for public endpoints)
4. **Input validation** (email, length limits, etc.)
5. **Proper error handling** with meaningful messages

Example:
```typescript
import { validateMethod, applyRateLimit } from '../../../lib/api-middleware';

export default async function handler(req, res) {
  // 1. Validate HTTP method
  if (!validateMethod(req, res, ['POST'])) return;

  // 2. Rate limiting
  if (!applyRateLimit(req, res, { limit: 100, windowMs: 60000 })) return;

  // 3. Authentication (if needed)
  const session = await getSession({ req });
  if (!session?.userId) return unauthorized(res);

  // 4. Input validation
  if (!req.body.email || !emailRegex.test(req.body.email)) {
    return _400(res, 'Invalid email format');
  }

  // 5. Handle request with try-catch
  try {
    // Your logic here
    res.json({ success: true });
  } catch (err) {
    return prismaErrorResponse(res, err);
  }
}
```

### React Components

- ✅ **Functional components** with hooks
- ✅ **TypeScript props** - Define clear interfaces
- ✅ **Accessibility** - Add ARIA labels and alt text
- ✅ **Error boundaries** - Wrap critical components
- ✅ **Loading states** - Show meaningful loading UI

Example:
```tsx
interface ButtonProps {
  onClick: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  loading = false,
  children
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};
```

### Security Best Practices

1. **Never expose secrets** in client-side code
2. **Validate all inputs** - Never trust user input
3. **Use parameterized queries** - Prisma handles this
4. **Rate limit public endpoints** - Prevent abuse
5. **Check authorization** - Verify user permissions
6. **Sanitize outputs** - Prevent XSS attacks
7. **Use HTTPS** in production
8. **Keep dependencies updated**

### Code Style

- ✅ **2 spaces** for indentation
- ✅ **Single quotes** for strings
- ✅ **Semicolons** required
- ✅ **Trailing commas** in multi-line
- ✅ **No console.log** in production code (use conditional logging)

## Security Guidelines

### Reporting Security Vulnerabilities

**DO NOT** open a public issue for security vulnerabilities.

Instead, email security concerns to: [Add security email here]

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Security Checklist for PRs

Before submitting a PR, verify:

- [ ] No secrets or credentials in code
- [ ] Input validation on all user inputs
- [ ] Authorization checks where needed
- [ ] Rate limiting on public endpoints
- [ ] SQL injection prevention (use Prisma)
- [ ] XSS prevention (sanitize outputs)
- [ ] CSRF protection (HTTP method validation)
- [ ] Error messages don't leak sensitive info

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks
- `security`: Security improvements

### Examples

```bash
feat(api): add webhook system for integrations

- Implement webhook delivery system
- Add retry logic with exponential backoff
- Support multiple webhook URLs per project

Closes #123
```

```bash
fix(auth): prevent authorization bypass in feedback deletion

Users could delete any feedback without ownership check.
This fix verifies project membership before allowing deletion.

Security: CVE-2024-XXXXX
```

```bash
docs(readme): add Docker setup instructions

Add comprehensive Docker Compose guide for local development.
```

## Pull Request Process

1. **Update documentation** - If you change APIs, update README/docs
2. **Add tests** - Include tests for new features
3. **Update CHANGELOG.md** - Add entry under [Unreleased]
4. **Ensure CI passes** - All checks must pass
5. **Request review** - Tag relevant maintainers
6. **Address feedback** - Respond to review comments
7. **Squash commits** (if requested) - Keep history clean

### PR Title Format

Use semantic commit format:
- `feat: add user profile page`
- `fix: resolve memory leak in feedback list`
- `docs: update API documentation`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test this?

## Security Checklist
- [ ] Input validation added
- [ ] Authorization checks in place
- [ ] No sensitive data exposed
- [ ] Rate limiting considered

## Screenshots (if applicable)
Add screenshots for UI changes
```

## Testing

### Running Tests

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Type checking
yarn type-check

# Linting
yarn lint
```

### Writing Tests

```typescript
describe('API: /api/feedback', () => {
  it('should create feedback with valid data', async () => {
    const response = await request(app)
      .post('/api/feedback')
      .send({
        projectId: 'test-project',
        message: 'Great product!',
        email: 'test@example.com'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should reject feedback without message', async () => {
    const response = await request(app)
      .post('/api/feedback')
      .send({ projectId: 'test-project' });

    expect(response.status).toBe(400);
  });
});
```

## Questions?

Feel free to:
- Open a discussion on GitHub
- Join our community chat (if available)
- Email maintainers

---

**Thank you for contributing! Your efforts make this project better for everyone.** 🙏
