const { DOCS_URL } = process.env;

const navLink = JSON.stringify([
  { label: "Dashboard", url: "/dashboard" },
  { label: "Integration", url: "/integration" },
  { label: "Docs", url: DOCS_URL },
]);

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    title: "Feedback",
    logo: "Feedback",
    navLink,
  },
};
