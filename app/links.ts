import prisma from '@/lib/db';
import type { Prisma } from '@prisma/client';

export default async function getNavLinks() {
  const res = await prisma.category.findMany({
    orderBy: [
      {
        rank: 'asc',
      }
    ],
    include: {
      links: {
        orderBy: {
          rank: 'asc',
        },
        where: {
          public: true,
          status: 1,
        },
      },
    },
  });
  return res;
}

export async function getLinksByCategoryKey(categoryKey: string) {
  const categoryWithLinks = await prisma.category.findMany({
    where: {
      key: categoryKey,
    },
    include: {
      links: {
        orderBy: {
          rank: 'asc',
        },
        where: {
          public: true,
          status: 1,
        },
      },
    },
  });
  return categoryWithLinks ? categoryWithLinks[0].links: [];
}

export type CategoryWithLinks = Prisma.PromiseReturnType<typeof getNavLinks>
