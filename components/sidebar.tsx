"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Category } from "@prisma/client"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export interface SidebarProps {
  className?: string
  navItems: Pick<Category, "title" | "icon" | "id" | "key">[]
}

export function Sidebar({ className, navItems }: SidebarProps) {
  const [activeTabId, setActiveTabId] = useState(navItems[0].key)

  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    if (pathname === "/") {
      const hash = window.location.hash
      if (hash) {
        setActiveTabId(hash.replace("#", ""))
      } else {
        setActiveTabId(navItems[0].key)
      }
    } else {
      const newActiveTabId = pathname.replace("/", "")
      setActiveTabId(newActiveTabId)
    }
  }, [pathname, navItems])

  return (
    <nav className="after:h-[calc(100vh - 65px)] block h-screen w-60 flex-col flex-nowrap bg-[#ededf4] font-semibold dark:bg-background sm:px-6 sm:pb-6">
      <Link
        href="/"
        className="flex items-center justify-center font-medium text-red-500"
        title={siteConfig.name}
      >
        <Image
          src="https://img.xnewstar.com/file/eb04c34888c83659e01fb.png"
          alt={siteConfig.name}
          width={100}
          height={100}
        />
      </Link>
      <div>
        <h1 className="text-center text-lg text-red-500">
          {siteConfig.shortName} <br />
          发现好用免费的AI工具
        </h1>
      </div>
      <div className="flex-start relative z-40 flex h-[calc(100vh-160px)] w-full flex-col  gap-2 overflow-y-auto  overflow-x-hidden rounded pt-4 opacity-100">
        {navItems.map((category) => {
          return (
            <Link
              href={isHomePage ? `#${category.key}` : `/${category.key}`}
              className={`block cursor-pointer rounded-lg hover:bg-gray-300 hover:text-purple-500 ${
                activeTabId === category.key
                  ? "bg-gray-300 text-purple-500"
                  : "text-primary"
              }`}
              key={category.id}
              onClick={() => setActiveTabId(category.key)}
              title={category.title}
            >
              <div className="scale relative mb-2 flex items-center gap-2 rounded-r-lg p-2 transition-colors ease-in-out before:transition-colors hover:no-underline sm:border-l-0 sm:pl-6 sm:before:absolute sm:before:left-[-5px] sm:before:top-[2px] sm:before:h-[calc(100%-4px)] sm:before:w-[10px] sm:before:rounded-full sm:before:transition-colors">
                <div className="relative flex shrink-0">
                  <Image
                    src={category.icon}
                    alt={category.title}
                    className="block"
                    width={20}
                    height={20}
                  />
                </div>
                <span className="truncate">{category.title}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
