import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

import "./src/env";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/meetings",
        permanent: false,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  tunnelRoute: true,
  widenClientFileUpload: true,
});
