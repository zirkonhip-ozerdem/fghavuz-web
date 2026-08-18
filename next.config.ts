import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {protocol: "http", hostname: "localhost", port: "8000", pathname: "/storage/**"},
      {protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/storage/**"},
      {protocol: "https", hostname: "fghavuz-admin-production.up.railway.app", pathname: "/storage/**"},
    ],
  },
  allowedDevOrigins: ["192.168.1.83"],
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
