"use client"

import { useRouter } from "next/navigation"

const error = () => {
  const router = useRouter()

  const handleRefresh = () => {
    router.refresh() // Refreshes current route
  }
  return (
    <>
      <p className="text-2xl text-red-400 font-gloria">
        Listen... I probably got lazy and coded this poorly or your internet is
        slow and it failed fetching the data/ It's one of the two so just:
      </p>
      <button
        onClick={handleRefresh}
        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 font-gloria"
      >
        Refresh Page
      </button>
    </>
  )
}

export default error
