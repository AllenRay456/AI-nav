import { NextResponse } from "next/server"

import prisma from "@/lib/db"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const linkList = await prisma.category.create({
      data
    })
    return NextResponse.json(linkList)
  } catch (error) {
    // 如果发生错误，返回错误信息
    // 类型断言，确保 error 是一个 Error 对象
    const errorMessage = (error as Error).message;
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
