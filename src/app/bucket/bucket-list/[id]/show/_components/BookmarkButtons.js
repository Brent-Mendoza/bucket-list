import Link from "next/link"

const BookmarkButtons = () => {
  return (
    <Link
      href="/bucket/bucket-list"
      className="bg-red-400 p-2 rounded-tl-xl font-gloria font-semibold w-full hover:-translate-x-2.5 duration-200 ease-linear"
    >
      Bucket List
    </Link>
  )
}

export default BookmarkButtons
