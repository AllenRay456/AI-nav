import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarProps } from "./sidebar"
import { getCurrentUser } from "@/lib/session"
import { UserAccountNav } from "./user-account-nav"

export async function SiteHeader({ navItems }: SidebarProps) {
  const user = await getCurrentUser()
  return (
    <header className="sticky top-0 z-40 w-full bg-background dark:border-slate-50/[0.06] md:static lg:border-b lg:border-slate-900/10">
      <div className="container flex h-16 items-center px-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} navItems={navItems} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* <Link
              href={'https://forms.gle/AET8HUe6Y9QPdWvh7'}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <span className="">提交共享AI资源</span>
              </div>
            </Link> */}
            <Link href={process.env.NEXT_PUBLIC_BLOG!} target="_blank">
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <span className="text-red-400">AI导航博客</span>
              </div>
            </Link>
            {/* <ThemeToggle /> */}
            {user && <UserAccountNav user={user} />}
          </nav>
        </div>
      </div>
    </header>
  )
}
