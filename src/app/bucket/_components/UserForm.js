"use client"

import { useData } from "../_provider/AuthProvider"

export default function UserForm() {
  const user = useData()
  return (
    <h2 className="text-2xl font-boldfont-gloria">
      Hello {user.userData.username} you're here!
    </h2>
  )
}
