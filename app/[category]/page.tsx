import { LinkItem } from "@/components/link-content"
import { Sidebar } from "@/components/sidebar"
import { SiteFooter } from "@/components/site-footer"

import getNavLinks, { getLinksByCategoryKey } from "../links"

export const revalidate = 24 * 60 * 60

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
    <div className="container relative mx-auto min-h-screen w-full px-0">
      <div className="flex">
        <div className="fixed z-20 hidden min-h-screen w-[16rem] transition-all duration-300 ease-in-out sm:block ">
          <Sidebar navItems={navItems} />
        </div>
        <div className="sm:pl-[16rem]">
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
