"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("reflexRushUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    console.log("[v0] Login attempt:", { email, passwordLength: password.length })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation for demo
        if (email && password.length >= 6) {
          console.log("[v0] Login validation passed")
          const userData = {
            id: Date.now(),
            name: email.split("@")[0],
            email: email,
            loginTime: new Date().toISOString(),
          }
          console.log("[v0] Setting user data:", userData)
          setUser(userData)
          localStorage.setItem("reflexRushUser", JSON.stringify(userData))
          resolve(userData)
        } else {
          console.log("[v0] Login validation failed:", { hasEmail: !!email, passwordLength: password.length })
          reject(new Error("Invalid credentials. Password must be at least 6 characters."))
        }
      }, 1000)
    })
  }

  const signup = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation for demo
        if (name && email && password.length >= 6) {
          const userData = {
            id: Date.now(),
            name: name,
            email: email,
            signupTime: new Date().toISOString(),
          }
          setUser(userData)
          localStorage.setItem("reflexRushUser", JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error("Invalid signup data"))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("reflexRushUser")
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
