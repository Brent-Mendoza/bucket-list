"use client"

import { RefreshCcw } from "lucide-react"

const error = () => {
  const handleRefresh = () => {
    window.location.reload()
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="text-2xl text-red-400 font-gloria max-md:text-xl max-sm:text-lg">
        Listen... I probably got lazy and coded this poorly or your internet is
        slow and it failed fetching the data/ It's one of the two so just:
      </p>
      <button
        onClick={handleRefresh}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-xl hover:bg-red-600 font-gloria cursor-pointer hover:scale-110 active:scale-95 duration-200"
      >
        <RefreshCcw />
        Refresh Page
      </button>
    </div>
  )
}

export default error
