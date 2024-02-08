import "@/styles/globals.css"
import { Metadata } from "next"
import { Analytics } from '@vercel/analytics/react';
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="zh" suppressHydrationWarning>
        <head >
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: `{
              "@context" : "https://schema.org",
              "@type" : "WebSite",
              "name" : "AI指南针",
              "url" : "https://toolbox.xnewstar.com/"
            }`
          }} />
          {/* 添加 Google Analytics 脚本 */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-09T8P6V323" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ks86964al2");
              `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-09T8P6V323');
              `,
            }}
          />
          <link rel="canonical" href="https://toolbox.xnewstar.com/" />
        </head>

        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </>
  )
}
