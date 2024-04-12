import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function POST(req: Request) {
  const { id } = await req.json()
  const detail = await prisma.link.findFirst({
    where: {
      id,
    },
  })

  return NextResponse.json(detail)
}
