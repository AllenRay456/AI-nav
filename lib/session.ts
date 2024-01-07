import authOptions from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}
