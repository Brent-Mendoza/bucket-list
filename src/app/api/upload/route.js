// app/api/upload/route.js
import cloudinary from "@/lib/cloudinary"
import { NextResponse } from "next/server"

export const POST = async (req) => {
  const formData = await req.formData()
  const file = formData.get("image")

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No image provided" }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, res) => {
          if (error) return reject(error)
          resolve(res)
        })
        .end(buffer)
    })

    return NextResponse.json({ url: result.secure_url })
  } catch (err) {
    return NextResponse.json(
      { error: "Cloudinary upload failed" },
      { status: 500 }
    )
  }
}
