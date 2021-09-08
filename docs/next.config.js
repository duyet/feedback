const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
});

/** @type {import('next').NextConfig} */
module.exports = withNextra({
  reactStrictMode: true,
});
