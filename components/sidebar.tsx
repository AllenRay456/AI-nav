"use client"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Category } from "@prisma/client"


export interface SidebarProps {
  className?: string,
  navItems: Pick<Category, "title" | "icon" | "id" | "key">[],
}

export function Sidebar({ className, navItems }: SidebarProps) {
  const [activeTabId, setActiveTabId] = useState(navItems[0].key);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setActiveTabId(hash.replace('#',''));
    }
  }, []);

  // useEffect(() => {
  //   const ele = document.getElementById(activeTabId);
  //   const elePosition = (ele?.getBoundingClientRect().top || 0);
  //   const offsetPosition = elePosition + window.pageYOffset - 75;
  //   window.scrollTo({
  //     top: offsetPosition,
  //     behavior: "smooth"
  //   });
  // }, [activeTabId]);

  return (
      <nav className="after:h-[calc(100vh - 65px)] block min-h-screen w-60 flex-row flex-nowrap bg-[#ededf4] dark:bg-background font-semibold sm:px-6 sm:pb-6">
        <a href="" className="items-center justify-center sm:flex text-red-500 font-medium">
          <Image
            src="https://img.xnewstar.com/file/eb04c34888c83659e01fb.png"
            alt="OpenAI导航站-发现最好用的通用和垂直AI工具"
            width={100}
            height={100}
          />
        </a>
        <div>
          <h1 className="text-lg text-center text-red-500">OpenAI导航站 <br/>发现最好用的通用和垂直AI工具</h1>
        </div>
        <div className="flex-start relative z-40 flex h-auto w-full flex-1 flex-col overflow-y-auto overflow-x-hidden rounded pt-4 opacity-100">
          <div className="flex list-none flex-col md:min-w-full md:flex-col">
            <div className={cn("flex-none pb-12", className)}>
              <div className="space-y-4 pb-4">
                <div className="py-2">
                  <div className="space-y-1">
                    { navItems.map((category) => {
                      return (
                        <a
                          className={`block cursor-pointer rounded-lg hover:bg-gray-300 hover:text-purple-500 ${activeTabId === category.key ? "bg-gray-300 text-purple-500" : "text-primary"}`}
                          key={category.id}
                          onClick={() => setActiveTabId(category.key)}
                          href={`#${category.key}`}
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
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{category.title}</span>
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}
