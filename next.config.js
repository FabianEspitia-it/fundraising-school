/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'media.licdn.com',
        pathname: '/dms/image/**',
      },
    ],
  },
};

module.exports = nextConfig;
