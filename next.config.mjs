/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    appDir: true,
  }
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
