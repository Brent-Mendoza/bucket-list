"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const isLoginPage = pathname === "/login"
  const hrefLink = !isLoginPage ? "/login" : "/register"
  const linkLabel = !isLoginPage ? "LOGIN" : "SIGNUP"
  return (
    <nav className="w-full py-3 px-10 flex justify-between items-center font-gloria">
      <div>
        <Link
          href="/"
          className="max-md:text-2xl max-sm:text-xl text-3xl font-bold hover:tracking-wider duration-150 ease-linear text-asparagus"
        >
          BUCK50
        </Link>
      </div>
      <div>
        <Link
          href={hrefLink}
          className="text-xl max-md:text-lg max-sm:text-lg hover:tracking-wider duration-150 ease-linear"
        >
          {linkLabel}
        </Link>
      </div>
    </nav>
  )
}
