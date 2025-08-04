import mongoose from "mongoose"

const bucketSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: Boolean, required: true },
  completed: {
    img: { type: String, required: false },
    description: { type: String, required: false },
  },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
})

export const Bucket =
  mongoose.models.Bucket ?? mongoose.model("Bucket", bucketSchema)
