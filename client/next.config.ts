import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.lazcdn.com", "placehold.co"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
