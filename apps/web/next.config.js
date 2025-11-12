/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
