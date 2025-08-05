"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

const Paper = ({ id }) => {
  const [bucket, setBucket] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/bucket/${id}`)
      if (!res.ok) {
        // redirect to not-found page
        router.push("/bucket/not-found")
        return
      }
      const data = await res.json()
      setBucket(data)
    }
    fetchData()
  }, [id, router])

  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="w-full h-full  bg-[url(/pattern1.svg)] font-gloria p-3 flex flex-col items-center justify-center gap-1.5">
      {bucket ? (
        <div className="flex flex-col w-full gap-4">
          <p className="text-lg">{bucket?.description}</p>{" "}
          {bucket?.completed.img && (
            <Image
              src={bucket.completed.img}
              width={400} // adjust these to match your tailwind width/height
              height={400}
              quality={100}
              className="w-[400px] h-[400px] max-md:w-full object-cover self-center border-2 border-neutral-300 rounded-xl shadow-md"
              alt="bucketImgs"
            />
          )}
          <p className="text-lg ">How did you do it?</p>
          <p className="text-lg">{bucket?.completed.description}</p>
        </div>
      ) : (
        <h2>Getting your data...*insert cool animation*</h2>
      )}
    </div>
  )
}

export default Paper
