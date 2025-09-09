"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const Game = () => {
  const [gameState, setGameState] = useState("menu") // 'menu', 'playing', 'paused', 'gameOver'
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [combo, setCombo] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60) // Timer in seconds
  const [gameDuration, setGameDuration] = useState(60) // Selected game duration
  const [bestScore, setBestScore] = useState(() => {
    return Number.parseInt(localStorage.getItem("reflexRushBestScore") || "0")
  })
  const [shapes, setShapes] = useState([])
  const [nextShapeId, setNextShapeId] = useState(1)

  const gameAreaRef = useRef(null)
  const gameLoopRef = useRef(null)

  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"]
  const shapeTypes = ["circle", "square", "triangle"]

  const getMultiplier = () => Math.floor(combo / 5) + 1

  const createShape = useCallback(() => {
    if (!gameAreaRef.current) return

    const rect = gameAreaRef.current.getBoundingClientRect()
    const size = Math.random() * 40 + 40 // 40-80px
    const isGolden = Math.random() < 0.1 // 10% chance for golden star

    const newShape = {
      id: nextShapeId,
      x: Math.random() * (rect.width - size),
      y: Math.random() * (rect.height - size),
      size,
      color: isGolden ? "golden-star" : colors[Math.floor(Math.random() * colors.length)],
      type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      isGolden,
      timeLeft: isGolden ? 3000 : 2000, // Golden shapes last longer
      maxTime: isGolden ? 3000 : 2000,
    }

    setShapes((prev) => [...prev, newShape])
    setNextShapeId((prev) => prev + 1)
  }, [nextShapeId])

  const handleShapeClick = (shapeId) => {
    setShapes((prev) => {
      const shape = prev.find((s) => s.id === shapeId)
      if (!shape) return prev

      const points = shape.isGolden ? 50 * getMultiplier() : 10 * getMultiplier()
      setScore((prevScore) => prevScore + points)
      setCombo((prevCombo) => prevCombo + 1)

      return prev.filter((s) => s.id !== shapeId)
    })
  }

  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setLives(3)
    setCombo(0)
    setTimeLeft(gameDuration)
    setShapes([])
    setNextShapeId(1)
  }

  const pauseGame = () => {
    setGameState(gameState === "paused" ? "playing" : "paused")
  }

  const endGame = () => {
    setGameState("gameOver")
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem("reflexRushBestScore", score.toString())
    }
  }

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return

    console.log("[v0] Starting game loop with duration:", gameDuration, "seconds")

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        console.log("[v0] Timer tick - current time:", prevTime)
        const newTime = prevTime - 1 // Decrease by 1 second every second
        if (newTime <= 0) {
          console.log("[v0] Timer reached 0, ending game")
          setTimeout(endGame, 100)
          return 0
        }
        return newTime
      })
    }, 1000) // Run every 1000ms (1 second)

    gameLoopRef.current = setInterval(() => {
      setShapes((prev) => {
        const updated = prev.map((shape) => ({
          ...shape,
          timeLeft: shape.timeLeft - 50,
        }))

        const expired = updated.filter((shape) => shape.timeLeft <= 0)
        if (expired.length > 0) {
          console.log("[v0] Shapes expired:", expired.length)
          setLives((prevLives) => {
            console.log("[v0] Lives before:", prevLives, "expired shapes:", expired.length)
            const newLives = prevLives - expired.length
            console.log("[v0] Lives after:", newLives)
            if (newLives <= 0) {
              console.log("[v0] No lives left, ending game")
              setTimeout(endGame, 100)
              return 0
            }
            return newLives
          })
          setCombo(0) // Reset combo on miss
        }

        return updated.filter((shape) => shape.timeLeft > 0)
      })

      if (Math.random() < 0.15) {
        // Reduced from 0.3 to 0.15
        createShape()
      }
    }, 50)

    return () => {
      console.log("[v0] Cleaning up game loop intervals")
      clearInterval(timerInterval)
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameState, createShape])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "p" || e.key === "P") {
        if (gameState === "playing" || gameState === "paused") {
          pauseGame()
        }
      } else if (e.key === "r" || e.key === "R") {
        if (gameState === "gameOver" || gameState === "menu") {
          startGame()
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameState])

  if (gameState === "menu") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text mb-8 pulse-neon">
            Reflex Rush ⚡
          </h1>
          <p className="text-gray-300 mb-8 text-lg">Test your reflexes! Click the shapes before the timer runs out.</p>
          <div className="mb-8">
            <p className="text-gray-300 mb-4">Select Game Duration:</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setGameDuration(30)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  gameDuration === 30
                    ? "bg-violet-600 text-white neon-glow"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                30 Seconds
              </button>
              <button
                onClick={() => setGameDuration(60)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  gameDuration === 60
                    ? "bg-violet-600 text-white neon-glow"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                1 Minute
              </button>
            </div>
          </div>
          <div className="mb-8">
            <p className="text-violet-400 text-xl font-semibold">Best Score: {bestScore}</p>
          </div>
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg text-xl neon-glow transition-all duration-200 transform hover:scale-105"
          >
            Start Game
          </button>
          <p className="text-gray-400 text-sm mt-4">Press R to restart • Press P to pause</p>
        </div>
      </div>
    )
  }

  if (gameState === "gameOver") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-5xl font-bold text-red-400 mb-8">Game Over!</h1>
          <div className="bg-gray-800 rounded-lg p-6 mb-8 neon-border">
            <p className="text-2xl font-semibold text-violet-400 mb-2">Final Score</p>
            <p className="text-4xl font-bold text-white mb-4">{score}</p>
            <p className="text-lg text-gray-300 mb-2">Best Score: {bestScore}</p>
            {score === bestScore && score > 0 && <p className="text-yellow-400 font-semibold">🎉 New Best Score!</p>}
          </div>
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg text-xl neon-glow transition-all duration-200 transform hover:scale-105"
          >
            Play Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      {/* Game HUD */}
      <div className="max-w-6xl mx-auto mb-4">
        <div className="flex justify-between items-center bg-gray-800 rounded-lg p-4 neon-border">
          <div className="flex items-center space-x-6">
            <div>
              <span className="text-gray-400">Score: </span>
              <span className="text-2xl font-bold text-violet-400">{score}</span>
            </div>
            <div>
              <span className="text-gray-400">Time: </span>
              <span className={`text-2xl font-bold ${timeLeft <= 10 ? "text-red-400" : "text-green-400"}`}>
                {Math.ceil(timeLeft)}s
              </span>
            </div>
            <div>
              <span className="text-gray-400">Lives: </span>
              <span className="text-xl font-bold text-red-400">{"❤️".repeat(lives)}</span>
            </div>
            <div>
              <span className="text-gray-400">Combo: </span>
              <span className="text-xl font-bold text-yellow-400">{combo}</span>
              {combo >= 5 && <span className="text-sm text-green-400 ml-2">x{getMultiplier()}</span>}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={pauseGame}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              {gameState === "paused" ? "Resume" : "Pause"}
            </button>
            <div className="text-gray-400 text-sm">P: Pause • R: Restart</div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="max-w-6xl mx-auto">
        <div
          ref={gameAreaRef}
          className="relative bg-gray-800 rounded-lg h-96 md:h-[500px] overflow-hidden neon-border"
          style={{ minHeight: "400px" }}
        >
          {gameState === "paused" && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Paused</h2>
                <p className="text-gray-300">Press P to resume</p>
              </div>
            </div>
          )}

          {shapes.map((shape) => (
            <div
              key={shape.id}
              className={`game-shape ${shape.color} ${shape.type === "square" ? "rounded-lg" : shape.type === "triangle" ? "rounded-none" : ""}`}
              style={{
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                clipPath: shape.type === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
              }}
              onClick={() => handleShapeClick(shape.id)}
            >
              {/* Timer ring */}
              <div
                className="timer-ring"
                style={{
                  width: shape.size + 20,
                  height: shape.size + 20,
                  left: -10,
                  top: -10,
                  animationDuration: `${shape.maxTime}ms`,
                  animationDelay: `${shape.maxTime - shape.timeLeft}ms`,
                }}
              />
            </div>
          ))}

          {shapes.length === 0 && gameState === "playing" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500 text-xl">Click the shapes as they appear!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Game
