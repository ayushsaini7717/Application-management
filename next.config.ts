import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  env: {
    NEXTAUTH_SECRET: "eScyBMOwp/Kuv6MVCkGB9Or0P79QCzvu1AoJwsCISAc=", 
  },
};

export default nextConfig;
