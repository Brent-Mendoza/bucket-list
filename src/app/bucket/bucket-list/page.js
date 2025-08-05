import SectionOne from "./_components/SectionOne"
import BookmarkButtons from "./_components/BookmarkButtons"
import FilterBucket from "./_components/FilterBucket"
import SectionTwo from "./_components/SectionTwo"
import { Bucket } from "@/lib/_models/BucketModel"
import mongoose from "mongoose"
import getAuthUser from "@/lib/getAuthUser"
import ClientBucketsWrapper from "./_components/BucketWrapper"

export default async function BucketList() {
  const user = await getAuthUser()
  if (!user) {
    // You can redirect or handle unauthorized state here
    return <div>Unauthorized</div>
  }

  const rawBuckets = await Bucket.find({
    userId: mongoose.Types.ObjectId.createFromHexString(user.userId),
  }).lean()

  const buckets = rawBuckets.map((bucket) => ({
    ...bucket,
    _id: bucket._id.toString(),
    userId: bucket.userId.toString(),
  }))

  return (
    <div className="w-full h-full flex items-center justify-center animate-appearin overflow-hidden">
      <ClientBucketsWrapper initialBuckets={buckets} />
    </div>
  )
}
