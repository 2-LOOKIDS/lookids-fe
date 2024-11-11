/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  images: {
    domains: ["picsum.photos", "media.lookids.online"], // 추가
  },
};

const { withS3Upload } = require("next-s3-upload");
