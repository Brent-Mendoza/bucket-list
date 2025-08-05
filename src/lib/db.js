import mongoose from "mongoose"

if (!process.env.MONGODBURI) {
  throw new Error("MONGODB NOT FOUND!")
}

let isConnected = false

export const ConnectDB = async () => {
  if (isConnected) {
    return
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true
  } catch (err) {
    throw err
  }
}
