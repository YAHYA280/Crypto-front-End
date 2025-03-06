const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'coin-images.coingecko.com'],
  },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = withNextIntl(nextConfig);
