import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createSession } from "@/lib/session"
import { loginSchema } from "@/lib/model"
import { ConnectDB } from "@/lib/db"
import { User } from "@/lib/_models/UserModel"

export const POST = async (request) => {
  const body = await request.json()

  const result = loginSchema.safeParse(body)
  let zodErrors = {}
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    })

    return NextResponse.json({ error: zodErrors }, { status: 400 })
  }

  const { email, password } = body

  try {
    await ConnectDB()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    await createSession(user._id.toString())

    return NextResponse.redirect(new URL("/bucket", request.url))
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
