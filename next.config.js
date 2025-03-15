const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'coin-images.coingecko.com'],
  },
  eslint: { ignoreDuringBuilds: true },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/nl/login',
        permanent: false, // Use true if this is a permanent redirect
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
