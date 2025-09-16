import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // frontend calls /api/*
        destination:
          "http://alb-public-backend-dev-71866973.us-east-1.elb.amazonaws.com/:path*", // backend (http)
      },
    ];
  },
};

export default nextConfig;
