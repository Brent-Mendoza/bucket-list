"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Form } from "@/components/ui/form"
import { ChevronDownIcon, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useData } from "../_provider/AuthProvider"

//GOSH THIS IS SO LONG, SHADCDN MAKES IT SO LONG UGHHHHHHHHHH BUT I DONT WANNA MAKE ANOTHER COMPONENT FOR THEMMM......I can tolerate this....
export default function Navbar() {
  const userData = useData()
  const router = useRouter()
  const form = useForm()
  const path = usePathname()

  const onSubmit = async () => {
    try {
      await fetch(`/api/logout`, { method: "POST" })
      toast("Logged Out successfully!")
      router.push("/")
    } catch (err) {
      toast.error("Logout failed")
    }
  }

  return (
    <nav className="w-full py-3 px-10 flex justify-between items-center font-gloria">
      <div>
        <Link
          href="/bucket"
          className="max-md:text-2xl max-sm:text-xl text-3xl font-bold hover:tracking-wider duration-150 ease-linear text-asparagus"
        >
          BUCK50
        </Link>
      </div>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link
                href="/bucket"
                className={`duration-150 ease-linear ${
                  path === "/bucket"
                    ? "line-through text-neutral-900"
                    : "hover:tracking-wider"
                }`}
              >
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link
                href="/bucket/bucket-list"
                className={`duration-150 ease-linear ${
                  path === "/bucket/bucket-list" || path.startsWith("/bucket/")
                    ? "line-through text-neutral-900"
                    : "hover:tracking-wider hover:text-neutral-950"
                }`}
              >
                Bucket List
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 outline-0 cursor-pointer hover:scale-110 duration-150 ease-linear">
                  <Avatar className="rounded-xl shadow-xl bg-goldendream ">
                    <AvatarFallback className="bg-transparent">
                      {userData
                        ? userData.userData.username.slice(0, 1).toUpperCase()
                        : "P"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="cursor-pointer">
                  <DropdownMenuItem>
                    <Form {...form}>
                      <form
                        className="space-y-4 flex flex-col"
                        onSubmit={form.handleSubmit(onSubmit)}
                      >
                        <button
                          type="submit"
                          className="flex items-center gap-2"
                        >
                          <LogOut /> Logout
                        </button>
                      </form>
                    </Form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </nav>
  )
}
