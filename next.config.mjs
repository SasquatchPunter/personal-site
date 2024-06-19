/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io" }],
    unoptimized: true,
  },
};

export default nextConfig;
