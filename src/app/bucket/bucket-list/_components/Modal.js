"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"

const modalSchema = z.object({
  description: z.string().min(1, "Please enter what you did").trim(),
  image: z
    .any()
    .optional()
    .refine(
      (file) => file === undefined || (file instanceof File && file.size > 0),
      {
        message: "Invalid image file",
      }
    ),
})

const Modal = ({ id, open, onClose, onRefresh }) => {
  const form = useForm({
    resolver: zodResolver(modalSchema),
    defaultValues: {
      description: "",
      image: undefined,
    },
  })

  const onComplete = async (data) => {
    let imageUrl = ""

    if (data.image instanceof File) {
      const formData = new FormData()
      formData.append("image", data.image)

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const uploadData = await uploadRes.json()

      if (!uploadRes.ok) {
        toast(uploadData.error || "Image upload failed")
        return
      }

      imageUrl = uploadData.url
    }

    const payload = {
      objectID: id,
      description: data.description,
      image: imageUrl,
    }

    const response = await fetch(`/api/bucket`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = responseData?.error || "Something went wrong"
      toast(error)
      return
    }

    await onRefresh()

    form.reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="font-gloria">
          <DialogTitle>How did you complete the bucket?</DialogTitle>
        </DialogHeader>
        {!form.formState.isSubmitting ? (
          <Form {...form}>
            <form
              className="space-y-4 flex flex-col font-gloria "
              onSubmit={form.handleSubmit(onComplete)}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description:</FormLabel>
                    <FormControl>
                      <Input placeholder="Description..." {...field} />
                    </FormControl>
                    {form.errors?.description && (
                      <p className="text-red-500">
                        {form.errors.description.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Add a picture you are fond of doing this bucket?
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null
                          field.onChange(file)
                        }}
                        ref={field.ref}
                      />
                    </FormControl>
                    {form.errors?.image && (
                      <p className="text-red-500">
                        {form.errors.image.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="flex gap-2 self-center hover:scale-120 cursor-pointer"
              >
                <Check />
                Mark it as complete
              </button>
            </form>
          </Form>
        ) : (
          <div className="font-gloria flex items-center justify-center">
            <p className="text-xl max-md:text-lg max-sm:text-md">
              It's loading.....*Cool animation effects*
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
