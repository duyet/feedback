# Feedback

Collect issues, ideas and compliments with a simple widget.

> Please take note that this project is still under heavy development.

# Getting Started

## The Dashboard

Run the following command to create your SQLite database file.

```bash
npx prisma migrate dev --name init
```

Now, seed the database with the sample data in prisma/seed.ts by running the following command:


```bash
npx prisma db seed --preview-feature
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## The Docs

```bash
yarn dev
```

Open [http://localhost:3001/docs](http://localhost:3001/docs) with your browser to see the result.
