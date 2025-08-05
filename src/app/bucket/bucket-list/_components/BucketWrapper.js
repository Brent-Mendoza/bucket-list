// ClientBucketsWrapper.tsx
"use client"

import SectionOne from "./SectionOne"
import SectionTwo from "./SectionTwo"

import { useState } from "react"
import SectionAll from "./SectionAll"

const ClientBucketsWrapper = ({ initialBuckets }) => {
  const [buckets, setBuckets] = useState(initialBuckets)

  const fetchBuckets = async () => {
    const res = await fetch("/api/bucket")
    const data = await res.json()
    setBuckets(data)
  }

  const first25 = buckets.slice(0, 25)
  const second25 = buckets.slice(25, 50)

  return (
    //This idea of Section 1 and 2 might be scuffed........readlllllllllyyyy scuffed i dont even know how will i turn this to mobile mode...maybe i just..make it smaller?
    <div className="flex bg-white/70  shadow-md">
      <section className="h-200 w-120 p-4 flex flex-col max-sm:hidden max-lg:w-95 max-md:hidden">
        <div className="font-gloria">Page 1</div>
        <SectionOne buckets={first25} onRefresh={fetchBuckets} />
      </section>
      <div className="flex-grow w-5 max-md:w-3 bg-leather shadow max-sm:hidden max-md:hidden"></div>
      <section className="h-200 w-120 p-4 flex flex-col max-sm:hidden max-lg:w-95 max-md:hidden">
        <div className="font-gloria text-md w-full">
          This was supposed to be filters ngl
        </div>
        <SectionTwo
          buckets={second25}
          onRefresh={fetchBuckets}
          firstLength={first25.length}
        />
      </section>
      <section className="hidden max-md:flex max-md:w-full max-md:min-h-200 max-sm:flex max-sm:w-full max-sm:min-h-200">
        <SectionAll buckets={buckets} onRefresh={fetchBuckets} />
      </section>
    </div>
  )
}

export default ClientBucketsWrapper
