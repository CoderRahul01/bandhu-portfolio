import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' res.cloudinary.com https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' blob: data: res.cloudinary.com images.unsplash.com https://www.googletagmanager.com; font-src 'self' data: fonts.gstatic.com; connect-src 'self' res.cloudinary.com https://www.google-analytics.com https://analytics.google.com; frame-src 'none'; object-src 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
