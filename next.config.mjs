import withMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
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

export default withMDX()(nextConfig)
