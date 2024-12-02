/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  images: {
    domains: ['picsum.photos', 'media.lookids.online'], // 추가
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.lookids.online:8000/:path*',
      },
    ];
  },
};

const { withS3Upload } = require('next-s3-upload');
