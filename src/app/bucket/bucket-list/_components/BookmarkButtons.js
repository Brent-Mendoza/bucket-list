"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const BookmarkButtons = () => {
  const path = usePathname()
  const isBucketList = path === "/bucket/bucket-list"
  const hrefLink = isBucketList ? "/bucket/favorite" : "/bucket/bucket-list"
  const btnLabel = isBucketList ? "Favorite" : "Bucket List"
  return (
    <Link
      href={hrefLink}
      className="bg-red-400 p-2 rounded-tl-xl font-gloria font-semibold w-full hover:-translate-x-2.5 duration-200 ease-linear"
    >
      {btnLabel}
    </Link>
  )
}

export default BookmarkButtons
