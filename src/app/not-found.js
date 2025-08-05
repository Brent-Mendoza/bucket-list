"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const NotFound = () => {
  const router = useRouter()
  return (
    <div className="flex items-center justify-center gap-2 min-h-screen w-full">
      <p className="text-2xl text-red-400 font-gloria max-md:text-xl max-sm:text-lg">
        HAHA....page not found :P
      </p>
      <button
        onClick={() => router.back()}
        className="px-4 py-2 flex items-center font-gloria gap-2 bg-red-400 text-white rounded hover:bg-red-500 transition cursor-pointer"
      >
        <ArrowLeft /> Go Back
      </button>
    </div>
  )
}

export default NotFound
