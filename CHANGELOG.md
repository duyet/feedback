# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - Security & Performance (2025-11-17)

#### Security Enhancements
- **HTTP Method Validation**: All 16 API routes now validate HTTP methods to prevent CSRF attacks
- **Rate Limiting Middleware**: In-memory rate limiting (100 req/min for feedback, 10/hour for invitations)
- **CORS Configuration**: Proper CORS headers for widget cross-origin support with preflight handling
- **Input Validation**:
  - Email format validation with regex
  - Message length limits (max 10,000 characters)
  - Project and invitation validation
- **Authorization Checks**: Feedback deletion now verifies project ownership
- **Error Handling**: Try-catch blocks added to URL parsing utility
- **Production Hardening**: NextAuth debug mode disabled in production
- **API Middleware Library**: Reusable security middleware (`lib/api-middleware.ts`)

#### Features
- **Pagination**: Feedback list API with page, limit, total, totalPages, hasMore
- **Search Functionality**: Full-text search across message, email, and name fields
- **Integration Triggers**:
  - Slack webhook notifications on new feedback
  - Email notifications via SendGrid
  - Graceful failure handling (doesn't block feedback creation)
- **Domain Management**: Implemented domain deletion functionality
- **Query Optimization**: Exclude large base64 screenshots from list queries
- **User Search Limits**: Limited to 10 results to prevent large queries

#### SEO & Accessibility
- **Landing Page SEO**:
  - OpenGraph meta tags (og:title, og:description, og:image, og:url)
  - Twitter Card meta tags (summary_large_image)
  - Semantic HTML with keywords, author, canonical URL
- **Documentation SEO**: Fixed empty meta tags in docs theme
- **robots.txt**: Created with proper disallow rules for /api/ and /dashboard
- **Accessibility**: Added descriptive alt text to all images (WCAG compliance)

#### Developer Experience
- **Docker Support**:
  - Docker Compose with PostgreSQL, Dashboard, and Docs
  - Automatic database migrations on startup
  - Hot reload support for development
  - Health checks for database
- **Comprehensive README**:
  - Quick start guide with Docker
  - Manual setup instructions
  - Environment variables documentation
  - Security features showcase
  - API usage examples
  - Contributing guidelines
- **CI/CD Fixes**:
  - Updated Lighthouse CI workflow from Node 14 to 18
  - Fixed package manager (npm → yarn)
  - Updated GitHub Actions to v4

### Changed
- **Error Handling**: Improved fetcher with proper HTTP error handling and status codes
- **API Responses**: Standardized error response format across all endpoints
- **Invitation URLs**: Dynamic protocol detection (works in both dev and production)
- **Database Queries**: Optimized with proper select fields and includes

### Removed
- **Debug Code**: Removed 9 console.log statements from production code
- **Debug Mode**: Disabled NextAuth debug in production

### Fixed
- **Critical Authorization Bug**: Feedback deletion authorization bypass (CVE-level)
- **Invitation Validation**: Added email format and project access validation
- **URL Parsing Crashes**: Added error handling for invalid URLs
- **CI/CD Pipeline**: Fixed broken Lighthouse CI workflow

### Security
- 🔒 **13 Critical Vulnerabilities Fixed**
- 🔒 **Rate Limiting**: Protection against DoS attacks
- 🔒 **CSRF Protection**: HTTP method validation
- 🔒 **Authorization**: Proper ownership checks
- 🔒 **Input Validation**: Prevents injection attacks

## [0.1.0] - Previous Version

### Initial Features
- Next.js 13 dashboard
- Prisma ORM with PostgreSQL
- NextAuth.js authentication
- Chakra UI components
- Feedback collection with screenshots
- Project management
- Team invitations
- Nextra documentation

---

## Migration Guide

### For Existing Deployments

If you're upgrading from a previous version:

1. **Update Environment Variables**: Add `NEXTAUTH_SECRET` (required)
2. **Database Migration**: Run `yarn prisma migrate deploy`
3. **API Clients**: Update to handle new pagination format for `/api/feedback/list`
4. **Rate Limits**: Be aware of new rate limits (100/min for feedback, 10/hour for invitations)

### Breaking Changes
- Feedback list API now returns paginated results: `{ data: [], pagination: {} }`
- Invitation API requires email validation

---

For more details, see the [README](./README.md) and [Security Documentation](./SECURITY.md).
