import {
  Dancing_Script,
  Gloria_Hallelujah,
  Inter,
  Nunito,
  Shadows_Into_Light,
} from "next/font/google"
import "./globals.css"
import { ConnectDB } from "@/lib/db"
import { Toaster } from "sonner"

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
})

const shadowsIntoLight = Shadows_Into_Light({
  weight: "400",
  variable: "--font-shadow-into-light",
  subsets: ["latin"],
})

const gloriaHallelujah = Gloria_Hallelujah({
  weight: "400",
  variable: "--font-gloria-hallelujah",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
})

export const metadata = {
  title: "Bucket List",
  description: "List 100 things you want to do before becoming a bucket.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default async function RootLayout({ children }) {
  const conn = await ConnectDB()
  return (
    <html lang="en">
      <body
        className={`${dancingScript.variable} ${shadowsIntoLight.variable} ${gloriaHallelujah.variable} ${inter.variable} ${nunito.variable}  antialiased`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
