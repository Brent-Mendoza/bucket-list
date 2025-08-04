import mongoose from "mongoose"

if (!process.env.MONGODBURI) {
  throw new Error("MONGODB NOT FOUND!")
}

export const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODBURI)
    return conn
  } catch (e) {
    throw new Error(e)
  }
}
