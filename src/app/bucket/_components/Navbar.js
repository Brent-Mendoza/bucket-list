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
import { ChevronDownIcon, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

//GOSH THIS IS SO LONG, SHADCDN MAKES IT SO LONG UGHHHHHHHHHH BUT I DONT WANNA MAKE ANOTHER COMPONENT FOR THEMMM......I can tolerate this....
export default function Navbar() {
  const path = usePathname()
  return (
    <nav className="w-full py-3 px-10 flex justify-between items-center font-gloria">
      <div>
        <Link
          href="/bucket"
          className="max-md:text-2xl max-sm:text-xl text-3xl font-bold hover:tracking-wider duration-150 ease-linear text-asparagus"
        >
          BUCK100
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
                      JB
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="cursor-pointer">
                  <DropdownMenuItem>
                    <Settings />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut /> Logout
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
