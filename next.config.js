/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: 'active-re-web-back-bhgdggh3b4amhsa0.eastus-01.azurewebsites.net',
        pathname: '/assets/**',
      },
    ],
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
        source: '/compliance/form/',
        destination: '/compliance-form/',
        permanent: true, // 301
      },
      {
        source: '/compliance/kyc',
        destination: '/compliance-form/',
        permanent: true, // 301
      },
    ];
  },
  async headers() {
    const isProduction = process.env.NODE_ENV === 'production'
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
          ? 'max-age=31536000; includeSubDomains; preload' 
          : 'max-age=0',
      }
    ];

    return [
      {
        // HTML pages must not be cached so users always get fresh chunk hashes after a deployment
        // Excludes static assets that are safe to cache for a long time
        source: '/((?!_next/static|_next/image|images|maps|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:js|mjs|css|png|jpg|jpeg|webp|avif|svg|ico|woff|woff2|ttf|otf|mp4|webm|pdf|txt|xml)).*)',
        headers: [
          ...baseSecurityHeaders,
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          ...baseSecurityHeaders,
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/maps/:path*',
        headers: [
          ...baseSecurityHeaders,
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
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
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
