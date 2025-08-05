"use client"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { bucketSchema } from "@/lib/model"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const Paper = ({ id }) => {
  const [bucket, setBucket] = useState(null)
  const [error, setError] = useState(null)
  const [visibility, setVisibility] = useState(false)
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(bucketSchema),
    defaultValues: {
      description: bucket?.description,
    },
  })

  const toggleVisib = () => {
    setVisibility((prev) => !prev)
  }

  const fetchData = useCallback(async () => {
    const res = await fetch(`/api/bucket/${id}`)
    if (!res.ok) {
      router.push("/bucket/not-found")
      return
    }
    const data = await res.json()
    setBucket(data)
    form.reset({ description: data.description })
  }, [id, router, form])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const onEdit = async (data) => {
    const response = await fetch(`/api/bucket/${id}`, {
      method: "PATCH",
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
    setVisibility(false)
    await fetchData()
  }

  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="w-full h-full  bg-[url(/pattern1.svg)] font-gloria p-3 flex flex-col items-center justify-center gap-1.5">
      {bucket ? (
        <div className="flex flex-col items-center w-full gap-4">
          {!visibility && (
            <>
              <h2 className="text-2xl">{bucket?.description}</h2>{" "}
              <button
                onClick={toggleVisib}
                className="me-2 cursor-pointer hover:scale-130 duration-200 ease-linear"
              >
                <Pencil />
              </button>
            </>
          )}
          {visibility && (
            <Form {...form}>
              <form className="flex" onSubmit={form.handleSubmit(onEdit)}>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="flex-1">
                        <input
                          autoFocus
                          className="focus:outline-0 w-full border-0 text-2xl"
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
              <button
                onClick={toggleVisib}
                className="me-2 cursor-pointer hover:scale-130 duration-200 ease-linear text-2xl"
              >
                X
              </button>
            </Form>
          )}
        </div>
      ) : (
        <h2>Getting your data...*insert cool animation*</h2>
      )}
    </div>
  )
}

export default Paper
