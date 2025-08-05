import getAuthUserData from "@/lib/getUserData"

export async function GET() {
  const user = await getAuthUserData()
  return Response.json(user || {})
}
