/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/tool/:pat',
  //       destination: 'https://notion-next-ai-nav.vercel.app/tool/:path*',
  //     },
  //     {
  //       source: '/aiblog',
  //       destination: 'https://notion-next-ai-nav.vercel.app/',
  //     },
  //   ]
  // },
}

export default nextConfig
