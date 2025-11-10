import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: process.env.NEXT_MODE === 'standalone' ? 'standalone' : undefined,
  cacheComponents: true,
  experimental: {
    // useCache: true,
  },
};

export default nextConfig;
