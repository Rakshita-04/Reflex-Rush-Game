const HowToPlayPage = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text mb-4">
            How to Play ⚡
          </h1>
          <p className="text-gray-400 text-lg">Master the art of lightning-fast reflexes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Game Rules */}
          <div className="bg-gray-800 rounded-lg p-6 neon-border">
            <h2 className="text-2xl font-bold text-violet-400 mb-4 flex items-center">🎯 Game Rules</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Click on shapes before the timer ring shrinks completely
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                You start with 3 lives (❤️❤️❤️)
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Missing a shape costs you one life
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Game ends when you lose all lives
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Shapes appear randomly across the game area
              </li>
            </ul>
          </div>

          {/* Scoring System */}
          <div className="bg-gray-800 rounded-lg p-6 neon-border">
            <h2 className="text-2xl font-bold text-pink-400 mb-4 flex items-center">💯 Scoring System</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Regular shapes: <span className="text-violet-400 font-semibold">10 points</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                Golden stars: <span className="text-yellow-400 font-semibold">50 points</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Combo multiplier: Every 5 hits increases multiplier
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                Missing resets your combo to 0
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Golden stars last longer but give more points
              </li>
            </ul>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 rounded-lg p-6 neon-border">
            <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center">🎮 Controls</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <span className="text-gray-300">Pause/Resume Game</span>
                <kbd className="bg-gray-600 px-3 py-1 rounded text-white font-mono">P</kbd>
              </div>
              <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <span className="text-gray-300">Restart Game</span>
                <kbd className="bg-gray-600 px-3 py-1 rounded text-white font-mono">R</kbd>
              </div>
              <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <span className="text-gray-300">Click Shapes</span>
                <span className="text-violet-400 font-semibold">Mouse Click</span>
              </div>
            </div>
          </div>

          {/* Tips & Strategies */}
          <div className="bg-gray-800 rounded-lg p-6 neon-border">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center">💡 Tips & Strategies</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">💡</span>
                Focus on maintaining combos for higher scores
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">💡</span>
                Golden stars are worth the risk - they give 5x points!
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">💡</span>
                Watch the timer ring color: Green → Yellow → Red
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">💡</span>
                Stay calm under pressure - panic leads to mistakes
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">💡</span>
                Practice makes perfect - your reflexes will improve!
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="bg-gradient-to-r from-violet-600 to-pink-600 rounded-lg p-6 neon-glow">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Test Your Reflexes?</h3>
            <p className="text-gray-200 mb-4">Challenge yourself and climb the leaderboard!</p>
            <a
              href="/game"
              className="inline-block bg-white text-violet-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Playing Now! ⚡
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToPlayPage
