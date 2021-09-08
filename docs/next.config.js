const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
});

/** @type {import('next').NextConfig} */
module.exports = withNextra({
  reactStrictMode: true,
  basePath: "/docs",
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "/docs/:path*",
        permanent: true,
      },
    ];
  },
});
