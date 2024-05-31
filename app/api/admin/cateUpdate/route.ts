import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function POST(req: Request) {
  const { id, ...updateData } = await req.json()
  const detail = await prisma.category.update({
    where: {
      id,
    },
    data: updateData
  })

  return NextResponse.json(detail)
}
