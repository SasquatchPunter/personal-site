/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "export",
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io" }],
    // TODO: implement loader for static build image optimization
    // unoptimized: true,
  },
  async rewrites() {
    return [
      { source: "/:path*/404", destination: "/404" },
      { source: "/admin/:path*", destination: "/admin" },
    ];
  },
  webpack: (config, context) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: { icon: true },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
