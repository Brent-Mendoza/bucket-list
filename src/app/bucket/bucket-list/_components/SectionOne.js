"use client"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { bucketSchema } from "@/lib/model"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Eye, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const SectionOne = ({ buckets }) => {
  const [bucketList, setBucketList] = useState(buckets)
  const form = useForm({
    resolver: zodResolver(bucketSchema),
    defaultValues: {
      description: "",
    },
  })
  const [inputVisibility, setInputVisibility] = useState(false)

  const toggleVisib = () => {
    setInputVisibility((prev) => !prev)
  }

  const fetchBuckets = async () => {
    const res = await fetch("/api/bucket")
    const freshData = await res.json()
    setBucketList(freshData)
  }

  const onSubmit = async (data) => {
    const response = await fetch(`/api/bucket`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const responseData = await response.json()
    if (!response.ok) {
      const error = responseData?.error

      const firstError =
        typeof error === "string"
          ? error
          : typeof error === "object"
          ? Object.values(error)[0]
          : "Something went wrong"

      toast(firstError)

      return
    }

    await fetchBuckets()
    form.reset()
  }

  return (
    <div className="w-full h-full  bg-[url(/pattern1.svg)] font-gloria p-3 flex flex-col gap-1.5">
      <ol className="flex w-full flex-col pl-2 gap-1.5 list-decimal">
        {bucketList.map((data) => (
          <li key={data._id} className="flex items-center justify-between">
            <p className={`${data.status ? "line-through" : ""}`}>
              {data.description.length > 35
                ? data.description.slice(0, 35) + "..."
                : data.description}
            </p>
            <div className="flex gap-2">
              <Link
                href="/bucket/bucket-list/1/show"
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
        <Form {...form}>
          <form
            className="space-y-4 flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      autoFocus
                      className="focus:outline-0 w-full border-0"
                      placeholder="Enter bucket..."
                      {...field}
                    />
                  </FormControl>
                  {form.errors?.description && (
                    <p className="text-red-500">
                      {form.errors.description.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
      {!inputVisibility && (
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
