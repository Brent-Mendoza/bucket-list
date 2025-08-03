"use client"
import { Plus } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

const SectionTwo = ({ exampleData, first25Full }) => {
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
            <p>
              {data.todo.length > 35
                ? data.todo.slice(0, 35) + "..."
                : data.todo}
            </p>
            <div className="flex gap-2">
              <Link href="" className="bg-cyan-400 rounded-md px-1">
                <Eye />
              </Link>
              <button className="bg-asparagus rounded-md px-1">
                <Check />
              </button>
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      )}
      {first25Full && bucketList.length < 25 && !inputVisibility && (
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

export default SectionTwo
