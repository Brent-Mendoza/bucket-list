"use client"

import React, { useContext } from "react"

const AuthContext = React.createContext()

function AuthProvider({ children, userData }) {
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
