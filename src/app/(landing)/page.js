import { Button } from "@/components/ui/button"
import { ArrowBigRight } from "lucide-react"

export default function Home() {
  return (
    <section className="flex flex-col gap-5 items-center justify-center font-dancing ">
      <h1 className="text-4xl font-bold">
        <span className="text-6xl">100</span> THINGS TO DO <br /> BEFORE
        BECOMING A BUCKET
      </h1>
      <Button
        className={`font-gloria h-15 self-end cursor-pointer active:scale-75 duration-200 ease-linear hover:scale-110 bg-outerspace`}
      >
        <ArrowBigRight /> Get Started
      </Button>
    </section>
  )
}
