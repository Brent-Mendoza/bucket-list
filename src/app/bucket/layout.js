import Navbar from "./_components/Navbar"

export default function BucketLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-cream flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  )
}
