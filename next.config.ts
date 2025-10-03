import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Other config options here */

  typescript: {
    // ⚠️ Ignore TypeScript errors during production build
    ignoreBuildErrors: true,
  },

  eslint: {
    // ⚠️ Optionally ignore ESLint errors as well
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
