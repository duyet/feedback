# Feedback

[![Security Hardened](https://img.shields.io/badge/security-hardened-green.svg)](https://github.com/duyet/feedback)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13-black.svg)](https://nextjs.org/)

🚀 A modern feedback platform built with Next.js, TypeScript & Prisma to collect issues, ideas, and compliments from your users.

**Features:**
- 🔐 **Enterprise-grade security**: Rate limiting, CORS, input validation, authorization
- 📊 **Real-time feedback collection** with screenshot capture
- 🔔 **Multiple integrations**: Slack, Email notifications
- 🎨 **Beautiful UI** built with Chakra UI
- 📱 **Responsive design** works on all devices
- 🔍 **Advanced search & filtering** with pagination
- 👥 **Team collaboration** with role-based access
- 🐳 **Docker support** for easy deployment

> **Note**: This project has been significantly improved with comprehensive security hardening, performance optimizations, and production-ready features.

[Project information and milestone](https://duyet.notion.site/feedback-okie-one-235f310b198946b184d3617cf3d50de6)

![Screenshot](./dashboard/public/landing.png)

# Table of Contents

- [Quick Start with Docker](#quick-start-with-docker)
- [Manual Setup](#manual-setup)
  - [The Dashboard](#the-dashboard)
  - [The Docs](#the-docs)
  - [The Widget](#the-widget)
- [Environment Variables](#environment-variables)
- [Security Features](#security-features)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Stats](#stats)

# Quick Start with Docker

The fastest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/duyet/feedback.git
cd feedback

# Start all services (PostgreSQL, Dashboard, Docs)
docker-compose up -d

# Access the application
# Dashboard: http://localhost:3000
# Docs: http://localhost:3001
```

The Docker setup includes:
- PostgreSQL database with automatic migrations
- Next.js dashboard with hot reload
- Documentation site
- All dependencies pre-installed

# Manual Setup

## The Dashboard

[![Deploy Dashboard with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fduyet%2Ffeedback%2Ftree%2Fmain%2Fdashboard&env=GITHUB_ID,GITHUB_SECRET,GOOGLE_ID,GOOGLE_SECRET,DATABASE_URL,DOCS_URL,NEXTAUTH_URL,SENDGRID_API_KEY,EMAIL_SERVER,EMAIL_FROM)

Change the directory to `./dashboard` and install dependencies:

```bash
cd dashboard
yarn
```

Create the `.env` file from `.env.example`:

```bash
cp .env.example .env
vi .env
```

Run the following command to init the database:

```bash
yarn prisma migrate dev --name init
```

Now, seed the database with the sample data in prisma/seed.ts by running the following command:

```bash
yarn prisma db seed --preview-feature
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> Note: The dashboard using Next proxy to route http://localhost:3000/docs to http://localhost:3001/docs
> Please start the dashboard and the docs at the same time.

## The Docs

[![Deploy Docs with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fduyet%2Ffeedback%2Ftree%2Fmain%2Fdocs)

Change the directory to `./docs` and install dependencies:

```bash
cd docs
yarn
```

```bash
yarn dev
```

Open [http://localhost:3001/docs](http://localhost:3001/docs) with your browser to see the result.

## The Widget

The widget allows you to embed a feedback form directly into your website:

```tsx
import { Widget } from '@okie/widget';

function App() {
  return (
    <Widget
      projectId="your-project-id"
      title="Send us feedback"
      placeholder="Tell us what you think..."
    />
  );
}
```

> **Note**: The standalone widget package is currently in development. For now, use the dashboard component.

# Environment Variables

Create a `.env` file in the `dashboard` directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/feedback"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32

# OAuth Providers (optional)
GITHUB_ID="your-github-oauth-app-id"
GITHUB_SECRET="your-github-oauth-app-secret"
GOOGLE_ID="your-google-oauth-client-id"
GOOGLE_SECRET="your-google-oauth-client-secret"

# Email (optional)
EMAIL_SERVER="smtp://username:password@smtp.example.com:587"
EMAIL_FROM="noreply@feedback.okie.one"
SENDGRID_API_KEY="your-sendgrid-api-key"

# Docs URL
DOCS_URL="http://localhost:3001"
```

# Security Features

This project implements comprehensive security measures:

- ✅ **HTTP Method Validation**: All API routes validate HTTP methods
- ✅ **Rate Limiting**: Protects against DoS and spam attacks
- ✅ **CORS Configuration**: Secure cross-origin requests for widget
- ✅ **Input Validation**: Email format, message length, SQL injection prevention
- ✅ **Authorization Checks**: Proper ownership verification
- ✅ **Error Handling**: Graceful error handling without data exposure
- ✅ **Production Hardening**: Debug mode disabled in production

# API Documentation

The platform provides RESTful APIs for:

- **Feedback Management**: Create, list, delete, search feedback
- **Project Management**: CRUD operations, team management, settings
- **User Management**: Search, invitations, role-based access
- **Integrations**: Slack, Email notifications

Example API calls:

```bash
# Create feedback (with CORS support)
POST /api/feedback
Content-Type: application/json

{
  "projectId": "project-id",
  "message": "Great product!",
  "email": "user@example.com",
  "url": "https://example.com"
}

# List feedback (with pagination)
GET /api/feedback/list?project=project-id&page=1&limit=50&search=query
```

# Contributing

We welcome contributions! Please ensure your code:

1. Passes all security checks
2. Includes proper error handling
3. Has meaningful commit messages
4. Follows TypeScript strict mode
5. Includes tests for new features

# Stats

![Alt](https://repobeats.axiom.co/api/embed/ecc9f534d0c0eac4e006559857575db679de52c7.svg "Repobeats analytics image")
