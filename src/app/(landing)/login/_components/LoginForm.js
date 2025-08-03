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
import { LucideLogIn } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"

const LoginForm = () => {
  const form = useForm()
  return (
    <Form {...form}>
      <form className="space-y-4 flex flex-col">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
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
              <Link
                href="/register"
                className="self-end text-sm text-neutral-500 hover:tracking-wider hover:underline hover:underline-offset-2 duration-200 ease-linear"
              >
                Don't have an account?
              </Link>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full h-10 max-md:h-10 cursor-pointer hover:bg-cyan-600 active:scale-90 mt-2 duration-300 ease-linear hover:scale-110 bg-outerspace text-md">
          <LucideLogIn />
          Login
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
