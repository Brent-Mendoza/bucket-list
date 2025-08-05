"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerSchema } from "@/lib/model"
import { LucideLogIn } from "lucide-react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const RegisterForm = () => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data) => {
    const response = await fetch(`/api/register`, {
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
    toast("Registration successful!")
    form.reset()
  }
  return (
    <Form {...form}>
      <form
        className="space-y-4 flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email..." {...field} />
              </FormControl>
              {form.errors?.email && (
                <p className="text-red-500">{form.errors.email.message}</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter username..." {...field} />
              </FormControl>
              {form.errors?.username && (
                <p className="text-red-500">{form.errors.username.message}</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••" {...field} />
              </FormControl>
              {form.errors?.password && (
                <p className="text-red-500">{form.errors.password.message}</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••" {...field} />
              </FormControl>
              {form.errors?.confirmPassword && (
                <p className="text-red-500">
                  {form.errors.confirmPassword.message}
                </p>
              )}

              <FormMessage />
              <Link
                href="/login"
                className="self-end text-sm text-neutral-500 hover:tracking-wider hover:underline hover:underline-offset-2 duration-200 ease-linear"
              >
                Already have an account?
              </Link>
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full h-10 max-md:h-10 cursor-pointer hover:bg-cyan-600 active:scale-90 mt-2 duration-300 ease-linear hover:scale-110 bg-outerspace text-md disabled:cursor-not-allowed disabled:bg-neutral-600"
        >
          <LucideLogIn />
          Signup
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
