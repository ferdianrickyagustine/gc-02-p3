import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  images: {
    domains: ["img.lazcdn.com", "placehold.co"],
  },
};

export default nextConfig;
