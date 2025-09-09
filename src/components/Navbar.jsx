"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path) => {
    return location.pathname === path || (path === "/game" && location.pathname === "/")
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-gray-800 border-b border-violet-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text"
            >
              Reflex Rush ⚡
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {user ? (
                <>
                  <Link
                    to="/game"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/game")
                        ? "bg-violet-600 text-white neon-glow"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    Game
                  </Link>
                  <Link
                    to="/leaderboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/leaderboard")
                        ? "bg-violet-600 text-white neon-glow"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    Leaderboard
                  </Link>
                  <span className="text-violet-400 px-3 py-2 text-sm">Welcome, {user.name}!</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/login")
                        ? "bg-violet-600 text-white neon-glow"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/signup")
                        ? "bg-violet-600 text-white neon-glow"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    Signup
                  </Link>
                </>
              )}
              <Link
                to="/how-to-play"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/how-to-play")
                    ? "bg-violet-600 text-white neon-glow"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                How to Play
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
