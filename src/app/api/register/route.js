import { ConnectDB } from "@/lib/db"
import { registerSchema } from "@/lib/model"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createUser } from "@/lib/_queries/user"
import { createSession } from "@/lib/session"
import { User } from "@/lib/_models/UserModel"

export const POST = async (request) => {
  const body = await request.json()

  const result = registerSchema.safeParse(body)
  let zodErrors = {}
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    })

    return NextResponse.json({ error: zodErrors }, { status: 400 })
  }

  await ConnectDB()

  const hashedPassword = await bcrypt.hash(body.password, 5)

  const newUser = {
    email: body.email,
    username: body.username,
    password: hashedPassword,
  }

  const existingUser = await User.findOne({
    email: body.email,
  })

  if (existingUser) {
    return NextResponse.json({ error: "Email already used" }, { status: 500 })
  }

  try {
    const createdUser = await createUser(newUser)

    await createSession(createdUser._id.toString())
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }

  return NextResponse.json(
    { message: "User has been created" },
    { status: 201 }
  )
}
