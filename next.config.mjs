/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
   images: {
    domains: ['kodagu-backend.s3.ap-south-1.amazonaws.com'],
  },
};

export default nextConfig;
