import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LoginForm from "./_components/LoginForm"

export default function LogIn() {
  return (
    <section className="w-full h-full font-shadow animate-appearin max-sm:p-2">
      <Card className="mx-auto w-110 h-110 flex flex-col max-sm:w-full max-sm:h-full bg-white/90">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl max-sm:text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="text-neutral-600">
          I honestly don't know what to put in here
        </CardFooter>
      </Card>
    </section>
  )
}
