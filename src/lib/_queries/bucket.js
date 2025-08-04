import { Bucket } from "../_models/BucketModel"

export async function createBucket(bucket) {
  try {
    await Bucket.create(bucket)
  } catch (e) {
    throw new Error(e)
  }
}
