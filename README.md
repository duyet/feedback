# Feedback (Close beta)

🤙Feedback is a platform built with Next.js, TypeScript & Prisma to collect issues, ideas, and compliments.

> Please take note that this project is still under heavy development.

[Project information and milestone](https://duyet.notion.site/feedback-okie-one-235f310b198946b184d3617cf3d50de6)

![Screenshot](./dashboard/public/landing.png)

# Getting Started

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

Run the following command to init the database.

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

TBU

# Stats

![Alt](https://repobeats.axiom.co/api/embed/ecc9f534d0c0eac4e006559857575db679de52c7.svg "Repobeats analytics image")

