import { LinkItem } from "@/components/link-content"
import { Sidebar } from "@/components/sidebar"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from 'next'
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/config/site"
import getNavLinks, { getLinksByCategoryKey } from "../links"

export const revalidate = 43200
export const dynamic = 'force-static'

export async function generateStaticParams() {
  const navResources = await getNavLinks()
  const navItems = navResources.map((n) => {
    return {
      category: n.key,
    }
  })
  return navItems
}

export async function generateMetadata(
  { params }: {
    params: { category: string }
  },
): Promise<Metadata> {
  const navResources = await getNavLinks()
  const current = navResources.find(n => n.key === params.category)!

  return {
    title: `发现最好用的${current.title}工具`,
    description: current.description,
    openGraph: {
      title: `发现最好用的${current.title}工具 | ${siteConfig.shortName}`,
      description: current.description,
      url: params.category,
      siteName: siteConfig.shortName,
      images: [
        {
          url: 'https://img.xnewstar.com/file/8f237165e46090d92ad26.png',
          width: 2536,
          height: 1822,
          alt: current.description,
        },
      ],
      type: 'website',
    },
  }
}

export default async function CategroyPage({
  params,
}: {
  params: { category: string }
}) {
  const categroyLinks = await getLinksByCategoryKey(params.category)
  const navResources = await getNavLinks()
  const current = navResources.find(n => n.key === params.category)!
  const navItems = navResources.map((n) => {
    return {
      title: n.title,
      icon: n.icon,
      id: n.id,
      key: n.key,
    }
  })

  return (
    <div className="container relative mx-auto min-h-screen w-full px-4">
      <div className="flex">
        <div className="fixed z-20 hidden min-h-screen w-64 transition-all duration-300 ease-in-out sm:block ">
          <Sidebar navItems={navItems} />
        </div>
        <div className="sm:pl-64">
          <SiteHeader navItems={navItems} />
          <div className="my-8">
            <h2 className="mb-2 text-2xl font-bold text-primary/80 sm:text-3xl">
              {current.title}
            </h2>
            <div className="text-sm">{current.description}</div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {categroyLinks.map((link) => (
              <LinkItem link={link} key={link.id} />
            ))}
          </div>
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
