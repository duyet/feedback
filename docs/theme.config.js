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
      <meta name="description" content="" />
      <meta name="og:title" content="" />
    </>
  ),
}
