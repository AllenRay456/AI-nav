import Image from "next/image"
import { CategoryWithLinks } from "@/app/links"
import { Link as SiteLink } from "@prisma/client"
import Link from "next/link"

export function LinkItem({ link }: { link: SiteLink }) {
  return (
      <div className="relative mb-6 flex min-h-[122px] min-w-0 flex-col break-words rounded-lg border border-gray-200 p-4 shadow-md transition-all hover:-translate-y-1 hover:scale-105 hover:bg-border hover:shadow-lg  xl:mb-0">
        <Link href={link.url} target="_blank" className="flex items-center">
          <div className="mr-3 flex h-10 w-10 overflow-hidden rounded-full">
            {
              link.icon
                ? <Image
                    src={link.icon}
                    className="object-fill"
                    alt={link.title}
                    width={40}
                    height={40}
                  />
                : <span className="h-full w-full rounded-full bg-purple-500 text-center font-bold leading-10">{ link.title.slice(0, 1) }</span>
            }
          </div>
          <h3 className="text-xl font-bold text-primary">{ link.title }</h3>
        </Link>
        <div className="mt-2 line-clamp-2 text-sm text-primary">
          { link.description }
        </div>
      </div>
  )
}

export function LinkContent({ navResources }: { navResources: CategoryWithLinks }) {
  return (
    <div className="w-full pt-4">
      <div className="mx-auto w-full px-4 md:px-6">
        {
          navResources.map((category) => {
            const showMore = category.links.length > 9;
            const displayedLinks = showMore ? category.links.slice(0, 9) : category.links;
            return (
              <div id={category.key} key={category.id} className="mb-0 md:mb-12 pt-20 md:pt-0">
                <div className="my-4">
                  <h2 className="mb-2 text-2xl font-bold text-primary/80 sm:text-3xl">{ category.title }</h2>
                  <div className="text-sm">{category.description}</div>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                  {
                    displayedLinks.map((link) => (
                      <LinkItem link={link} key={link.id} />
                    ))
                  }
                  {
                    showMore && (
                      <LinkItem
                        link={({
                          id: '',
                          url: `/${category.key}`, // 根据实际路由调整
                          title: "更多AI",
                          description: `查看更多更全的 ${category.title} 应用`,
                          icon: "", // 如果您有一个特定的图标显示
                        } as SiteLink)}
                      />
                    )
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
