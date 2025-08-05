"use client"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { bucketSchema } from "@/lib/model"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Eraser, Eye, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Modal from "./Modal"

const SectionTwo = ({ buckets, onRefresh, firstLength }) => {
  const form = useForm({
    resolver: zodResolver(bucketSchema),
    defaultValues: {
      description: "",
    },
  })

  const [inputVisibility, setInputVisibility] = useState(false)
  const [isModal, setIsModal] = useState({
    id: null,
    open: false,
  })

  const toggleVisib = () => {
    setInputVisibility((prev) => !prev)
  }

  const toggleModal = (objectID) => {
    setIsModal((prev) => ({ ...prev, id: objectID, open: !prev.open }))
  }

  //ONSUBMIT
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

    await onRefresh()
    form.reset()
  }

  //ONDELETE
  const onDelete = async (data) => {
    const response = await fetch(`/api/bucket`, {
      method: "DELETE",
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

    await onRefresh()
  }

  //ONUNCOMPLETE
  const onDecomplete = async (data) => {
    const response = await fetch(`/api/bucket`, {
      method: "PUT", //idk i dont want to add more things in my patch so let this be PUT
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

    await onRefresh()
  }

  return (
    <div className="w-full h-full  bg-[url(/pattern1.svg)] font-gloria p-3 flex flex-col gap-1.5">
      <Modal
        id={isModal.id}
        open={isModal.open}
        onClose={() => setIsModal({ id: null, open: false })}
        onRefresh={onRefresh}
      />
      <ol className="flex w-full flex-col pl-2 gap-1.5  list-decimal">
        {buckets.map((data) => (
          <li key={data._id} className="flex items-center justify-between">
            <Link
              href={`${
                !data.status
                  ? `/bucket/bucket-list/${data._id}/show`
                  : `/bucket/bucket-list/${data._id}/completed`
              }`}
              className="hover:tracking-wider duration-100 ease-linear"
            >
              <p className={`${data.status ? "line-through" : ""}`}>
                {data.description.length > 35
                  ? data.description.slice(0, 35) + "..."
                  : data.description}
              </p>
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onDelete({ objectID: data._id })}
                className="rounded-md px-1 cursor-pointer hover:scale-120 active:scale-95 duration-100 ease-linear"
              >
                <Eraser />
              </button>
              {!data.status ? (
                <button
                  className="rounded-md px-1 cursor-pointer hover:scale-120 active:scale-95 duration-100 ease-linear "
                  onClick={() => toggleModal(data._id)}
                >
                  <Check />
                </button>
              ) : (
                <button
                  className="rounded-md px-1 cursor-pointer hover:scale-120 active:scale-95 duration-100 ease-linear"
                  onClick={() => onDecomplete({ objectID: data._id })}
                >
                  <X />
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
      {firstLength == 25 && buckets.length !== 25 && inputVisibility && (
        <div className="flex items-center justify-between w-full gap-4">
          <Form {...form}>
            <form
              className="flex w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
            <button
              className="me-2 cursor-pointer hover:scale-130 duration-200 ease-linear"
              onClick={toggleVisib}
            >
              X
            </button>
          </Form>
        </div>
      )}
      {firstLength == 25 && buckets.length !== 25 && !inputVisibility && (
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
