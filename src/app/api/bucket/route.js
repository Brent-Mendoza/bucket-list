import { Bucket } from "@/lib/_models/BucketModel"
import { createBucket } from "@/lib/_queries/bucket"
import getAuthUser from "@/lib/getAuthUser"
import { bucketSchema } from "@/lib/model"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const GET = async () => {
  //FETCH DATA
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
  //ADD NEW DATA
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

export const DELETE = async (request) => {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  if (!body.objectID) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 })
  }

  try {
    const bucketId = mongoose.Types.ObjectId.createFromHexString(body.objectID)
    await Bucket.findByIdAndDelete(bucketId)
    return NextResponse.json(
      { message: "Bucket erased successfully" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to erase bucket" },
      { status: 500 }
    )
  }
}

export const PATCH = async (request) => {
  let body
  try {
    body = await request.json()
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  if (!body.objectID) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 })
  }

  try {
    const bucketId = mongoose.Types.ObjectId.createFromHexString(body.objectID)
    const bodyImage = body.image
    const bodyDescription = body.description
    await Bucket.findByIdAndUpdate(bucketId, {
      status: true,
      completed: {
        description: bodyDescription,
        img: bodyImage || "",
      },
    })
    return NextResponse.json({ message: "Bucket completed!" }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to complete bucket" },
      { status: 500 }
    )
  }
}

export const PUT = async (request) => {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  if (!body.objectID) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 })
  }

  try {
    const bucketId = mongoose.Types.ObjectId.createFromHexString(body.objectID)
    await Bucket.findByIdAndUpdate(bucketId, {
      status: false,
      completed: {
        description: "",
        img: "",
      },
    })
    return NextResponse.json(
      { message: "Bucket uncompleted!" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to uncomplete bucket" },
      { status: 500 }
    )
  }
}
