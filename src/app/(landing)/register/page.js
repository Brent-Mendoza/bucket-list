import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import RegisterForm from "./_components/RegisterForm"

export default function Register() {
  return (
    <section className="w-full h-full font-shadow animate-appearin max-sm:p-2">
      <Card className="mx-auto w-150 h-150 flex flex-col max-sm:w-full max-sm:h-full bg-white/90">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl max-sm:text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="text-neutral-600">
          I should just put random trivias in spaces like this.
        </CardFooter>
      </Card>
    </section>
  )
}
