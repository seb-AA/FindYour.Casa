/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "a0.muscache.com",
      "iev9h9qu5zyvlgoc.public.blob.vercel-storage.com"  // Add your Blob storage domain here
    ],
  },
};

module.exports = nextConfig;
