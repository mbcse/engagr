/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      config.externals.push("pino-pretty", "lokijs", "encoding");
      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'cdn.8thwall.com',
        },
        {
          protocol: 'https',
          hostname: 'skill-connect-job-board.vercel.app',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  