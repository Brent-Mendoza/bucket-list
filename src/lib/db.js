import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODBURI

if (!MONGODB_URI) {
  throw new Error("MONGODBURI not found in environment variables")
}

let isConnected = false

export const ConnectDB = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true
    console.log("✅ MongoDB connected")
  } catch (err) {
    console.error("❌ MongoDB connection error:", err)
    throw err
  }
}
