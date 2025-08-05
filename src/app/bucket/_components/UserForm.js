"use client"

import { useEffect, useState } from "react"
import { useData } from "../_provider/AuthProvider"
import { Pencil } from "lucide-react"
import Link from "next/link"

export default function UserForm() {
  const [buckets, setBuckets] = useState(null)

  const fetchBuckets = async () => {
    const res = await fetch("/api/bucket")
    const data = await res.json()
    setBuckets(data)
  }

  useEffect(() => {
    fetchBuckets()
  }, [])
  const user = useData()
  return (
    <div className="flex flex-col gap-2 font-gloria">
      <h2 className="text-2xl font-bold ">
        Hello {user.userData.username} {"you're"} here!
      </h2>
      <div className="flex gap-5">
        <p>Current Progress: {buckets?.length ? buckets.length : "?"}/50</p>
        <Link
          href="bucket/bucket-list"
          className="flex items-center gap-1 bg-asparagus p-2 rounded-xl shadow-md font-semibold hover:scale-110 active:scale-95 cursor-pointer duration-200 ease-linear"
        >
          <Pencil />
          Start
        </Link>
      </div>
    </div>
  )
}
