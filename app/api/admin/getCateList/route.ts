import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function POST(req: Request) {
  const linkList = await prisma.category.findMany({
    orderBy: [
      {
        rank: "asc",
      },
    ],
  })

  return NextResponse.json(linkList)
}
