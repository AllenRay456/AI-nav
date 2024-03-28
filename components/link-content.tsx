import Image from "next/image"
import Link from "next/link"
import { Link as SiteLink } from "@prisma/client"

import { CategoryWithLinks } from "@/app/links"

export function LinkItem({ link }: { link: SiteLink }) {
  return (
    <Link
      href={link.key ? `${process.env.NEXT_PUBLIC_BLOG}/tool/${link.key}` : link.url}
      target="_blank"
      className="flex items-center"
    >
      <div className="relative mb-6 flex min-h-[122px] w-full min-w-0 flex-col break-words rounded-lg border border-gray-200 p-4 shadow-md transition-all hover:-translate-y-1 hover:scale-105 hover:bg-border hover:shadow-lg  xl:mb-0">
        <div className="flex items-center">
          <div className="mr-3 flex size-10 overflow-hidden rounded-full">
            {link.icon ? (
              <Image
                src={link.icon}
                className="object-fill"
                alt={link.title}
                width={40}
                height={40}
              />
            ) : (
              <span className="size-full rounded-full bg-purple-500 text-center font-bold leading-10">
                {link.title.slice(0, 1)}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-primary">{link.title}</h3>
        </div>
        <div className="mt-2 line-clamp-2 text-sm text-primary">
          {link.description}
        </div>
      </div>
    </Link>
  )
}

export function LinkContent({
  navResources,
}: {
  navResources: CategoryWithLinks
}) {
  return (
    <div className="w-full pt-4">
      <div className="mx-auto w-full px-4 md:px-6">
        {navResources.map((category) => {
          const showMore = category.links.length > 9
          const displayedLinks = showMore
            ? category.links.slice(0, 9)
            : category.links
          return (
            <div
              id={category.key}
              key={category.id}
              className="mb-0 pt-20 md:mb-12 md:pt-0"
            >
              <div className="my-4">
                <h2 className="mb-2 text-2xl font-bold text-primary/80 sm:text-3xl">
                  {category.title}
                </h2>
                <div className="text-sm">{category.description}</div>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {displayedLinks.map((link) => (
                  <LinkItem link={link} key={link.id} />
                ))}
                {showMore && (
                  <div className="relative mb-6 flex min-w-0 flex-col break-words rounded-lg border border-gray-200 p-4 shadow-md transition-all hover:-translate-y-1 hover:scale-105 hover:bg-border hover:shadow-lg  xl:mb-0">
                    <Link
                      href={`/${category.key}`}
                      className="flex items-center"
                    >
                      <div className="mr-3 flex size-10 overflow-hidden rounded-full">
                        <span className="size-full rounded-full bg-purple-500 text-center font-bold leading-10">
                          more
                        </span>
                      </div>
                      <h3 className="text-primary">
                        {`查看更多${category.title}应用`}
                      </h3>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
