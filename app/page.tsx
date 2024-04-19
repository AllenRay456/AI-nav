import { Sidebar } from "@/components/sidebar"
import getNavLinks from "./links"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LinkContent } from "@/components/link-content"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 43200
export const dynamic = 'force-static'

export default async function IndexPage() {
  const navResources = await getNavLinks();
  const navItems = navResources.map(n => {
    return {
      title: n.title,
      icon: n.icon,
      id: n.id,
      key: n.key,
    }
  })
  return <div className="container relative mx-auto min-h-screen w-full px-0">
      <div className="flex">
        <div className="fixed z-20 hidden min-h-screen w-[16rem] transition-all duration-300 ease-in-out sm:block ">
         <Sidebar navItems={navItems} />
        </div>
        <div className="sm:pl-[16rem]">
          <SiteHeader navItems={navItems} />
          <LinkContent navResources={navResources} />
          <SiteFooter />
        </div>
      </div>
    </div>
}
