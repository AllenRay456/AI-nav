/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cos.codefe.top',
      },
      {
        protocol: 'https',
        hostname: 'img.xnewstar.com',
      },
    ],
  }
}

export default nextConfig
