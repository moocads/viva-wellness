import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Monorepo: multiple lockfiles can make Turbopack treat the parent folder as root;
  // pin the app root so resolution (and dev behavior) matches this package.
  turbopack: {
    root: appDir,
    resolveAlias: {
      tailwindcss: path.join(appDir, "node_modules/tailwindcss"),
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "superadmin.moocads.com", pathname: "/**" },
      { protocol: "https", hostname: "*.amazonaws.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
