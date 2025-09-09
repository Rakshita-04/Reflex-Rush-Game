"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("[v0] Form submitted with data:", formData)
    setLoading(true)
    setError("")

    try {
      console.log("[v0] Calling login function")
      await login(formData.email, formData.password)
      console.log("[v0] Login successful, navigating to game")
      navigate("/game")
    } catch (err) {
      console.log("[v0] Login error:", err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text mb-2">
            Welcome Back! ⚡
          </h1>
          <p className="text-gray-400">Sign in to track your high scores</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 neon-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">{error}</div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg neon-glow transition-all duration-200 transform hover:scale-105"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/how-to-play" className="text-violet-400 hover:text-violet-300 transition-colors">
            ← Learn How to Play
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
