"use client"

import React, { useContext, useEffect, useState } from "react"

const AuthContext = React.createContext()

function AuthProvider({ children, userData }) {
  const [currentUser, setCurrentUser] = useState(userData)

  useEffect(() => {
    setCurrentUser(userData) // react to changes when a different user logs in
  }, [userData])
  return (
    <AuthContext.Provider value={{ userData: currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error("Can only be used inside Auth Provider")

  return context
}

export default AuthProvider
