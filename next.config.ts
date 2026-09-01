
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'standalone', // Necesario para Docker
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8055',
      },
      {
        protocol: 'https',
        hostname:
          'active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net',
        pathname: '/assets/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    unoptimized: false,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  async redirects() {
    return [
      {
        source: '/newsletter',
        destination: 'https://old.active-re.com/newsletter',
        permanent: false, // 302
      },
      {
        source: '/news/annual-report-2024',
        destination: '/annual-report/',
        permanent: false, // 302
      },
      {
        source: '/kyc-due-diligence',
        destination: '/compliance-form/',
        permanent: true, // 301
      },
      {
        source: '/form',
        destination: '/compliance-form/',
        permanent: true, // 301
      },
    ];
  },
  async headers() {
    const isProduction = process.env.TYPEENV === 'production'
    // Headers de seguridad base
    const baseSecurityHeaders = [
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
        value: 'no-referrer',
      },
      {
        key: 'X-Permitted-Cross-Domain-Policies',
        value: 'none',
      },
      {
        key: 'Permissions-Policy',
        value: 'autoplay=()',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'Strict-Transport-Security',
        value: isProduction 
          ? 'max-age=63072000; includeSubDomains; preload' 
          : 'max-age=0',
      }
    ];

    return [
  {
    source: '/:path*',
    headers: baseSecurityHeaders,
  },
  {
    source: '/ANNUALREPORT.pdf',
    headers: [
      {
        key: 'Content-Type',
        value: 'application/pdf',
      },
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  {
    source: '/:path*.mjs',
    headers: [
      {
        key: 'Content-Type',
        value: 'application/javascript',
      },
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  {
    source: '/:path*.js',
    headers: [
      {
        key: 'Content-Type',
        value: 'application/javascript; charset=utf-8',
      },
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  {
    source: '/_next/static/:path*.js',
    headers: [
      {
        key: 'Content-Type',
        value: 'application/javascript; charset=utf-8',
      },
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  {
    source: '/map.gl.html',
    headers: [
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
    ],
  },
];
  },
};

export default nextConfig;
