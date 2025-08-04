import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const POST = async () => {
  const cookieStore = await cookies()
  cookieStore.delete("session")

  return NextResponse.json({ message: "User has logged out" })
}
