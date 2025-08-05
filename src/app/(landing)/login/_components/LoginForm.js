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
import { loginSchema } from "@/lib/model"
import { zodResolver } from "@hookform/resolvers/zod"
import { LucideLogIn } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const LoginForm = () => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    const response = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (response.redirected) {
      // ✅ Let browser follow the redirect
      window.location.href = response.url
      return
    }
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
    toast("Login successful!")
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
                <Input type="email" placeholder="Enter email" {...field} />
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
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••" {...field} />
              </FormControl>
              {form.errors?.password && (
                <p className="text-red-500">{form.errors.password.message}</p>
              )}

              <FormMessage />
              <Link
                href="/register"
                className="self-end text-sm text-neutral-500 hover:tracking-wider hover:underline hover:underline-offset-2 duration-200 ease-linear"
              >
                {"Don't have an account?"}
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
          Login
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
