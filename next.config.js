/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [60, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
