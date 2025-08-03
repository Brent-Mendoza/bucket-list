import { Button } from "@/components/ui/button"
import { ArrowBigRight, PaintBucket } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative w-fit">
      {/* Background block */}
      <div className="absolute w-[300px] h-[200px] bg-cyan-500/10 rounded-xl -left-15 top-45 z-0 animate-comefrom max-sm:animate-none max-sm:hidden" />

      {/* Main section */}
      <section className="relative z-10 flex flex-col gap-3 items-center justify-center bg-white shadow rounded-xl px-5 py-10 animate-slideinup max-sm:animate-none">
        <PaintBucket className="self-end max-md:text-sm sm:text-xs" />
        <h1 className="max-md:text-2xl max-sm:text-3xl  text-4xl font-dancing">
          <span className="max-md:text-4xl max-sm:text-5xl font-semibold font-inter   text-6xl">
            100
          </span>{" "}
          THINGS TO DO <br /> BEFORE BECOMING A BUCKET
        </h1>
        <p className="font-shadow self-start text-md max-md:text-sm max-sm:text-sm text-neutral-600 italic">
          List 100 things you want to do in life and track your progress!
        </p>
        <Link href="/login" className="self-end">
          <Button className="font-gloria h-15 max-md:h-10 cursor-pointer hover:bg-cyan-600 active:scale-90 mt-2 duration-300 ease-linear hover:scale-110 bg-outerspace ">
            <ArrowBigRight /> Get Started
          </Button>
        </Link>
      </section>
    </div>
  )
}
