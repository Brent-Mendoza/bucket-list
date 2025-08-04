import SectionOne from "./_components/SectionOne"
import BookmarkButtons from "./_components/BookmarkButtons"
import FilterBucket from "./_components/FilterBucket"
import SectionTwo from "./_components/SectionTwo"
import { Bucket } from "@/lib/_models/BucketModel"
import mongoose from "mongoose"
import getAuthUser from "@/lib/getAuthUser"

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

  const first25 = buckets.slice(0, 25)
  const second25 = buckets.slice(25, 50)

  return (
    <div className="w-full h-full flex items-center justify-center animate-appearin">
      <div className="flex flex-col ">
        <BookmarkButtons />
      </div>
      <div className="flex bg-white/70  shadow-md">
        <section className="h-200 w-120 p-4 flex flex-col">
          <div className="font-gloria">Page 1</div>
          <SectionOne buckets={first25} />
        </section>
        <div className="flex-grow w-5 bg-leather shadow"></div>
        <section className="h-200 w-120 p-4 flex flex-col ">
          <div className="self-end font-gloria">
            <FilterBucket />
          </div>
          <SectionTwo />
        </section>
      </div>
    </div>
  )
}
