/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // Redirect non-www to www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'athertechy.com',
          },
        ],
        destination: 'https://www.athertechy.com/:path*',
        permanent: true,
      },
      // Redirect Render domain to custom domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'athertechy.onrender.com',
          },
        ],
        destination: 'https://www.athertechy.com/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
