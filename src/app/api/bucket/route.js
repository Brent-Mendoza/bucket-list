import { Bucket } from "@/lib/_models/BucketModel"
import { createBucket } from "@/lib/_queries/bucket"
import getAuthUser from "@/lib/getAuthUser"
import { bucketSchema } from "@/lib/model"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const buckets = await Bucket.find({
      userId: mongoose.Types.ObjectId.createFromHexString(user.userId),
    }).lean()
    return NextResponse.json(buckets)
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

export const POST = async (request) => {
  const body = await request.json()

  const user = await getAuthUser()
  const userId = user?.userId

  const result = bucketSchema.safeParse(body)
  let zodErrors = {}
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    })

    return NextResponse.json({ error: zodErrors }, { status: 400 })
  }

  const userIdObj = mongoose.Types.ObjectId.createFromHexString(userId)

  const newBucket = {
    description: body.description,
    status: false,
    completed: {
      img: "",
      description: "",
    },
    userId: userIdObj,
  }

  try {
    await createBucket(newBucket)
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }

  return NextResponse.json(
    { message: "Bucket has been created" },
    { status: 201 }
  )
}
