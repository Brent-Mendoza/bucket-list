"use client"

import { Check, Eye, Plus, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const SectionOne = ({ exampleData }) => {
  const [bucketList, setBucketList] = useState(exampleData)
  const [inputVisibility, setInputVisibility] = useState(false)
  const [input, setInput] = useState("")
  const inputRef = useRef()

  const toggleVisib = () => {
    setInputVisibility((prev) => !prev)
    inputRef.current?.focus()
  }

  const newList = () => {
    const newObj = {
      id: Date.now(),
      todo: input,
      status: false,
    }
    setInputVisibility((prev) => !prev)
    setBucketList((prev) => [...prev, { ...newObj }])
    setInput("")
  }

  useEffect(() => {
    exampleData = [bucketList]
    console.log(exampleData)
  }, [bucketList])

  return (
    <div className="w-full h-full  bg-[url(/pattern1.svg)] font-gloria p-3 flex flex-col gap-1.5">
      <ol className="flex w-full flex-col pl-2 gap-1.5 list-decimal">
        {bucketList.map((data) => (
          <li key={data.id} className="flex items-center justify-between">
            <p className={`${data.status ? "line-through" : ""}`}>
              {data.todo.length > 35
                ? data.todo.slice(0, 35) + "..."
                : data.todo}
            </p>
            <div className="flex gap-2">
              <Link
                href=""
                className=" rounded-md px-1 hover:scale-120 active:scale-95 duration-100 ease-linear text-cyan-500"
              >
                <Eye />
              </Link>
              {!data.status ? (
                <button className="rounded-md px-1 cursor-pointer hover:scale-120 active:scale-95 duration-100 ease-linear text-asparagus">
                  <Check />
                </button>
              ) : (
                <button className="rounded-md px-1 cursor-pointer hover:scale-120 active:scale-95 duration-100 ease-linear text-red-500">
                  <X />
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
      {inputVisibility && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            newList()
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="focus:outline-0 w-full"
            placeholder="Enter new bucket..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      )}
      {bucketList.length < 25 && !inputVisibility && (
        <button
          onClick={toggleVisib}
          className="w-20 h-10 flex gap-2 cursor-pointer hover:-skew-4 hover:scale-120"
        >
          <Plus /> Add..
        </button>
      )}
    </div>
  )
}

export default SectionOne
