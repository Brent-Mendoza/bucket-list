"use client"

import React, { useContext, useEffect, useState } from "react"

const AuthContext = React.createContext()

function AuthProvider({ children, userData: initialUserData }) {
  const [userData, setUserData] = useState(initialUserData)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth-user") // a new API route that calls getAuthUserData()
      const data = await res.json()
      setUserData(data)
    }

    fetchUser()
  }, [])
  return (
    <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error("Can only be used inside Auth Provider")

  return context
}

export default AuthProvider
