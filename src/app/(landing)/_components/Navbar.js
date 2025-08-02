import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full py-3 px-10 flex justify-between items-center font-gloria">
      <div>
        <Link href="/" className="text-3xl font-semibold">
          LOGO
        </Link>
      </div>
      <div>
        <Link href="" className="text-xl">
          LOGIN
        </Link>
      </div>
    </nav>
  )
}
