const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  unstable_staticImage: true
});

/** @type {import('next').NextConfig} */
module.exports = withNextra({
  reactStrictMode: true,
  basePath: "/docs",
});
