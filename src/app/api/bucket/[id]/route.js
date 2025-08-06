import { Bucket } from "@/lib/_models/BucketModel"
import { bucketSchema } from "@/lib/model"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
  const id = params.id

  try {
    await ConnectDB()

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const bucket = await Bucket.findById(id)
    if (!bucket) {
      return NextResponse.json({ error: "Not Found" }, { status: 400 })
    }

    return NextResponse.json(bucket)
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const id = params.id
  let body
  try {
    body = await request.json()
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const result = bucketSchema.safeParse(body)
  let zodErrors = {}
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    })

    return NextResponse.json({ error: zodErrors }, { status: 400 })
  }

  try {
    const bucketId = mongoose.Types.ObjectId.createFromHexString(id)
    const bodyDescription = result.data.description
    await Bucket.findByIdAndUpdate(bucketId, {
      description: bodyDescription,
    })
    return NextResponse.json({ message: "Bucket updated!" }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update bucket" },
      { status: 500 }
    )
  }
}
