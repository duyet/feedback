// theme.config.js
export default {
  github: 'https://github.com/duyet/feedback',
  docsRepositoryBase: 'https://github.com/duyet/feedback/blob/master',
  titleSuffix: ' – Feedback',
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: `${new Date().getFullYear()} © Okie.one.`,
  footerEditLink: `Edit this page on GitHub`,
  logo: (
    <>
      <span style={{ fontWeight: 700, marginRight: 7 }}>Feedback</span>
      <span>Documentation</span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Feedback - A modern platform built with Next.js, TypeScript & Prisma to collect issues, ideas, and compliments from your users." />
      <meta name="og:title" content="Feedback Documentation" />
      <meta name="og:description" content="Learn how to integrate and use the Feedback platform to collect user feedback effectively." />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Feedback Documentation" />
      <meta name="twitter:description" content="Learn how to integrate and use the Feedback platform to collect user feedback effectively." />
    </>
  ),
}
