import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function POST(req: Request) {
  const { title, cid } = await req.json()
  const linkList = await prisma.link.findMany({
    orderBy: [
      {
        rank: "asc",
      },
    ],

    where: {
      public: true,
      status: 1,
      title: {
        contains: title, // 使用contains来进行模糊查询
      },
      cid
    },
  })

  return NextResponse.json(linkList)
}
