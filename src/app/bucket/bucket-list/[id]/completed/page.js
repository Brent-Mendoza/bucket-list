import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Paper from "./_components/Paper"

export default function CompletedBucket({ params }) {
  const id = params.id

  return (
    <div className="w-full h-full flex items-center justify-center animate-appearin ">
      <section className="h-200 w-150 flex flex-col p-4 bg-white/70  max-md:w-full max-md:min-h-200">
        <Link
          href="/bucket/bucket-list"
          className="font-gloria flex gap-2 items-center ms-2 mt-2 hover:scale-110"
        >
          <ArrowLeft /> Go Back
        </Link>
        <Paper id={id} />
      </section>
    </div>
  )
}
