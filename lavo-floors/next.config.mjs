/** @type {import('next').NextConfig} */
import { fileURLToPath } from "url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig = {
  // 保证 turbopack/Next.js 能从正确的项目根目录读取 `.env.local`
  turbopack: {
    root: projectRoot,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'lavo-floor-cms-mooc.s3.ca-central-1.amazonaws.com',
      'lavo-floor-cms-edd09aab3332.herokuapp.com',
    ]
  },
}

export default nextConfig
