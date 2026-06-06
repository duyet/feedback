# Feedback

[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-v3-teal.svg)](https://chakra-ui.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-blue.svg)](https://www.prisma.io/)

A modern feedback platform to collect issues, ideas, and compliments from your users.

![Screenshot](./dashboard/public/landing.png)

## Features

- **Feedback collection** — embeddable widget with screenshot capture
- **Dashboard** — project management, search, filtering, pagination
- **Team collaboration** — invitations, role-based access (owner/member)
- **Integrations** — Slack webhooks, email notifications (SendGrid/SMTP)
- **Authentication** — GitHub, Google OAuth, magic email link via NextAuth
- **Security** — rate limiting, CORS, input validation, query parameter normalization
- **Docker** — one-command setup with `docker-compose`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (Pages Router) |
| UI | Chakra UI v3, React 19 |
| Database | PostgreSQL, Prisma 6 |
| Auth | NextAuth v4 |
| Docs | Nextra |
| CI | GitHub Actions, Lighthouse CI |
| Deploy | Vercel |

## Quick Start

### Docker (recommended)

```bash
git clone https://github.com/duyet/feedback.git
cd feedback
docker-compose up -d

# Dashboard: http://localhost:3000
# Docs:      http://localhost:3001
```

Includes PostgreSQL with auto-migrations, Next.js dashboard with hot reload, and the docs site.

### Manual Setup

#### Dashboard

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fduyet%2Ffeedback%2Ftree%2Fmain%2Fdashboard&env=GITHUB_ID,GITHUB_SECRET,GOOGLE_ID,GOOGLE_SECRET,DATABASE_URL,DOCS_URL,NEXTAUTH_URL,SENDGRID_API_KEY,EMAIL_SERVER,EMAIL_FROM)

```bash
cd dashboard
cp .env.example .env   # fill in your values
yarn install
yarn prisma migrate dev --name init
yarn prisma db seed
yarn dev
```

> The dashboard proxies `/docs` to the docs site. Start both for full functionality.

#### Docs

```bash
cd docs
yarn install
yarn dev
# → http://localhost:3001/docs
```

#### Widget

Embed a feedback form on any website:

```tsx
import { Widget } from '@okie/widget'

function App() {
  return (
    <Widget
      projectId="your-project-id"
      title="Send us feedback"
      placeholder="Tell us what you think..."
    />
  )
}
```

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/feedback"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="openssl rand -base64 32"

# OAuth (configure at least one)
GITHUB_ID=""
GITHUB_SECRET=""
GOOGLE_ID=""
GOOGLE_SECRET=""

# Email (optional — for magic link auth & notifications)
EMAIL_SERVER="smtp://user:pass@smtp.example.com:587"
EMAIL_FROM="noreply@example.com"
SENDGRID_API_KEY=""

# Slack (optional — for project notifications)
SLACK_WEBHOOK_URL=""

# Docs
DOCS_URL="http://localhost:3001"
```

## API

RESTful endpoints under `/api/`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/feedback` | Submit feedback (CORS-enabled for widget) |
| GET | `/api/feedback/list` | List with pagination & search |
| DELETE | `/api/feedback/delete` | Delete feedback |
| GET/POST | `/api/project` | List / create projects |
| GET/PUT | `/api/project/[id]` | Get / update project |
| POST | `/api/project/invitation` | Invite team member |
| GET | `/api/form/[id]` | Get form configuration |

All authenticated endpoints require a valid NextAuth session.

## Project Structure

```
feedback/
├── dashboard/          # Next.js 16 app (main application)
│   ├── pages/          # Pages Router routes & API endpoints
│   ├── components/     # React components (Chakra UI v3)
│   ├── lib/            # Utilities, Prisma client, middleware
│   ├── prisma/         # Database schema & migrations
│   └── theme/          # Chakra UI system config
├── docs/               # Nextra documentation site
├── widget/             # Embeddable feedback widget (WIP)
├── docker-compose.yml  # Docker orchestration
└── .github/            # CI workflows
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit with conventional commits (`feat:`, `fix:`, `chore:`)
4. Open a pull request

Requirements: TypeScript strict mode, passing CI, no lint errors.

## License

MIT © [Duyet Le](https://duyet.net)
