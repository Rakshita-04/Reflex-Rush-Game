"use client"

import { useState, useEffect } from "react"

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/mock-leaderboard.json")
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard")
        }
        const data = await response.json()
        setLeaderboard(data.leaderboard || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">Error loading leaderboard</p>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-400 text-lg">Top Reflex Rush players worldwide</p>
        </div>

        <div className="bg-gray-800 rounded-lg neon-border overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-pink-600 p-4">
            <div className="flex items-center justify-between text-white font-semibold">
              <span className="w-16">Rank</span>
              <span className="flex-1 text-left">Player</span>
              <span className="w-24 text-right">Score</span>
            </div>
          </div>

          <div className="divide-y divide-gray-700">
            {leaderboard.map((player, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 hover:bg-gray-700 transition-colors ${
                  index < 3 ? "bg-gray-750" : ""
                }`}
              >
                <div className="w-16 flex items-center">
                  <span
                    className={`text-2xl font-bold ${
                      index === 0
                        ? "text-yellow-400"
                        : index === 1
                          ? "text-gray-300"
                          : index === 2
                            ? "text-orange-400"
                            : "text-gray-400"
                    }`}
                  >
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                  </span>
                </div>

                <div className="flex-1 text-left">
                  <span className={`font-semibold ${index < 3 ? "text-white" : "text-gray-300"}`}>{player.name}</span>
                </div>

                <div className="w-24 text-right">
                  <span
                    className={`text-xl font-bold ${
                      index === 0
                        ? "text-yellow-400"
                        : index === 1
                          ? "text-gray-300"
                          : index === 2
                            ? "text-orange-400"
                            : "text-violet-400"
                    }`}
                  >
                    {player.score.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Your best score:{" "}
            <span className="text-violet-400 font-semibold">{localStorage.getItem("reflexRushBestScore") || "0"}</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">Keep playing to climb the leaderboard!</p>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage
