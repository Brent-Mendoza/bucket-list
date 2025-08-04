import getAuthUserData from "@/lib/getUserData"
import Navbar from "./_components/Navbar"
import AuthProvider from "./_provider/AuthProvider"
import getAuthUser from "@/lib/getAuthUser"

export default async function BucketLayout({ children }) {
  const user = await getAuthUser()
  const userData = await getAuthUserData()
  console.log(user)
  return (
    <AuthProvider userData={userData}>
      <div className="min-h-screen w-full bg-cream flex flex-col">
        <header>
          <Navbar />
        </header>
        <main className="flex-grow flex items-center justify-center">
          {children}
        </main>
      </div>
    </AuthProvider>
  )
}
