import { useState, useMemo, useEffect } from 'react'
import './App.css'
import GameCard from './components/GameCard'
import InstructionsModal from './components/InstructionsModal'
import TicTacToe from './games/TicTacToe'
import NumberGuesser from './games/NumberGuesser'
import RockPaperScissors from './games/RockPaperScissors'
import ReactionTest from './games/ReactionTest'
import MemoryGame from './games/MemoryGame'
import Snake from './games/Snake'
import InfiniteRacing from './games/InfiniteRacing'
import FlappyBird from './games/FlappyBird'
import Breakout from './games/Breakout'
import { storage } from './utils/storage'
import { themeManager } from './utils/theme'
import { soundManager } from './utils/sounds'
import { achievementManager } from './utils/achievements'

function App() {
  const [currentGame, setCurrentGame] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [showStats, setShowStats] = useState(false)
  const [theme, setTheme] = useState(themeManager.getTheme())
  const [soundEnabled, setSoundEnabled] = useState(soundManager.enabled)
  const [showInstructions, setShowInstructions] = useState(null)
  const [showAchievements, setShowAchievements] = useState(false)
  const [newAchievements, setNewAchievements] = useState([])

  // Check for achievements when stats change
  useEffect(() => {
    const allStats = storage.getStats()
    const newlyUnlocked = achievementManager.checkAchievements(allStats)
    if (newlyUnlocked.length > 0) {
      setNewAchievements(newlyUnlocked)
      newlyUnlocked.forEach(ach => {
        soundManager.playWin()
      })
      setTimeout(() => setNewAchievements([]), 5000)
    }
  }, [currentGame])

  const games = [
    {
      id: 'memory',
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of cards',
      icon: '🧠',
      component: MemoryGame,
      difficulty: 'Medium'
    },
    {
      id: 'reactiontest',
      title: 'Reaction Test',
      description: 'How fast can you react? Click when you see green!',
      icon: '⚡',
      component: ReactionTest,
      difficulty: 'Easy'
    },
    {
      id: 'numberguesser',
      title: 'Number Guesser',
      description: 'Guess the secret number between 1 and 100',
      icon: '🏆',
      component: NumberGuesser,
      difficulty: 'Easy'
    },
    {
      id: 'rockpaperscissors',
      title: 'Rock Paper Scissors',
      description: 'Classic hand game - beat the computer!',
      icon: '✂️',
      component: RockPaperScissors,
      difficulty: 'Easy'
    },
    {
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      description: 'Classic X and O strategy game',
      icon: '🎮',
      component: TicTacToe,
      difficulty: 'Hard'
    },
    {
      id: 'snake',
      title: 'Snake',
      description: 'Classic snake game - grow as long as you can!',
      icon: '🐍',
      component: Snake,
      difficulty: 'Medium'
    },
    {
      id: 'infiniteracing',
      title: 'Infinite Racing',
      description: 'Endless racing - avoid obstacles and survive!',
      icon: '🏎️',
      component: InfiniteRacing,
      difficulty: 'Hard'
    },
    {
      id: 'flappybird',
      title: 'Flappy Bird',
      description: 'Navigate through pipes - tap to fly!',
      icon: '🐦',
      component: FlappyBird,
      difficulty: 'Hard'
    },
    {
      id: 'breakout',
      title: 'Breakout',
      description: 'Break all the bricks with your paddle!',
      icon: '🎯',
      component: Breakout,
      difficulty: 'Medium'
    }
  ]

  const handleGameSelect = (gameId) => {
    setCurrentGame(gameId)
  }

  const handleBackToHub = () => {
    setCurrentGame(null)
    soundManager.playClick()
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    themeManager.setTheme(newTheme)
    setTheme(newTheme)
    soundManager.playClick()
  }

  const toggleSound = () => {
    if (soundEnabled) {
      soundManager.disable()
      setSoundEnabled(false)
    } else {
      soundManager.enable()
      setSoundEnabled(true)
      soundManager.playClick()
    }
  }

  // Filter games based on search and difficulty
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDifficulty = difficultyFilter === 'all' || 
                               game.difficulty.toLowerCase() === difficultyFilter.toLowerCase()
      return matchesSearch && matchesDifficulty
    })
  }, [searchQuery, difficultyFilter])

  const currentGameData = games.find(game => game.id === currentGame)
  const allStats = storage.getStats()
  const totalGamesPlayed = Object.values(allStats).reduce((sum, stat) => sum + (stat.gamesPlayed || 0), 0)

  if (currentGame && currentGameData) {
    const GameComponent = currentGameData.component
    return (
      <div className="game-transition">
        <GameComponent onBack={handleBackToHub} />
      </div>
    )
  }

  if (showStats) {
    return (
      <div className="app">
        <header className="app-header">
          <div className="game-controller">📊</div>
          <h1>Statistics</h1>
          <p>Your gaming achievements and records</p>
        </header>
        
        <div className="stats-container">
          <div className="stats-header">
            <button 
              onClick={() => {
                setShowStats(false)
                soundManager.playClick()
              }} 
              className="back-btn"
            >
              ← Back to Games
            </button>
            <button onClick={() => {
              if (confirm('Are you sure you want to clear all statistics?')) {
                storage.clearStats()
                window.location.reload()
              }
            }} className="clear-stats-btn">Clear Stats</button>
          </div>
          
          <div className="stats-grid">
            {games.map(game => {
              const gameStats = storage.getGameStats(game.id)
              return (
                <div key={game.id} className="stat-card">
                  <div className="stat-card-header">
                    <span className="stat-icon">{game.icon}</span>
                    <h3>{game.title}</h3>
                  </div>
                  <div className="stat-details">
                    <div className="stat-item">
                      <span className="stat-label">Games Played:</span>
                      <span className="stat-value">{gameStats.gamesPlayed}</span>
                    </div>
                    {gameStats.gamesWon > 0 && (
                      <div className="stat-item">
                        <span className="stat-label">Games Won:</span>
                        <span className="stat-value">{gameStats.gamesWon}</span>
                      </div>
                    )}
                    {gameStats.bestScore !== null && (
                      <div className="stat-item">
                        <span className="stat-label">Best Score:</span>
                        <span className="stat-value">{gameStats.bestScore}</span>
                      </div>
                    )}
                    {gameStats.bestReaction !== null && (
                      <div className="stat-item">
                        <span className="stat-label">Best Reaction:</span>
                        <span className="stat-value">{gameStats.bestReaction}ms</span>
                      </div>
                    )}
                    {gameStats.minAttempts !== null && (
                      <div className="stat-item">
                        <span className="stat-label">Best Attempts:</span>
                        <span className="stat-value">{gameStats.minAttempts}</span>
                      </div>
                    )}
                    {gameStats.lastPlayed && (
                      <div className="stat-item">
                        <span className="stat-label">Last Played:</span>
                        <span className="stat-value">
                          {new Date(gameStats.lastPlayed).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="total-stats">
            <h3>Total Games Played: {totalGamesPlayed}</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-controls">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button 
            onClick={toggleSound} 
            className="sound-toggle"
            title={soundEnabled ? 'Disable Sound' : 'Enable Sound'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
        <div className="game-controller">🎮</div>
        <h1>Arcade Hub</h1>
        <p>Play exciting mini games right in your browser. No downloads, just pure fun!</p>
      </header>
      
      <div className="controls-section">
        <div className="search-filter-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="clear-search"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          
          <div className="difficulty-filter">
            <label>Filter:</label>
            <select 
              value={difficultyFilter} 
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <button 
            onClick={() => {
              setShowStats(true)
              soundManager.playClick()
            }} 
            className="stats-button"
            title="View Statistics"
          >
            📊 Stats
          </button>
          <button 
            onClick={() => {
              setShowAchievements(true)
              soundManager.playClick()
            }} 
            className="achievements-button"
            title="View Achievements"
          >
            🏅 Achievements
          </button>
          <button 
            onClick={() => {
              setShowInstructions('all')
              soundManager.playClick()
            }} 
            className="instructions-button"
            title="View Game Instructions"
          >
            ❓ Help
          </button>
        </div>
        
        {searchQuery && (
          <div className="search-results-info">
            Found {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      
      <main className={`games-grid ${filteredGames.length === 0 ? 'empty' : ''}`}>
        {filteredGames.length === 0 ? (
          <div className="no-games-message">
            <div className="no-games-icon">🎯</div>
            <h3>No games found</h3>
            <p>Try adjusting your search or filter</p>
          </div>
        ) : (
          filteredGames.map(game => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              icon={game.icon}
              difficulty={game.difficulty}
              onClick={() => {
                handleGameSelect(game.id)
                soundManager.playClick()
              }}
            />
          ))
        )}
      </main>
      
      <footer className="app-footer">
        <div className="footer-content">
          <p>🎮 Arcade Hub - Mini Game Collection</p>
          <p>Built with React & Vite | Enjoy your gaming experience!</p>
          <div className="footer-links">
            <a href="https://github.com/aryannten/mini-proj" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        </div>
      </footer>

      {showInstructions && (
        <InstructionsModal 
          gameId={showInstructions} 
          onClose={() => setShowInstructions(null)} 
        />
      )}

      {newAchievements.length > 0 && (
        <div className="achievement-notification">
          {newAchievements.map((ach, idx) => (
            <div key={ach.id} className="achievement-popup" style={{ animationDelay: `${idx * 0.2}s` }}>
              <div className="achievement-popup-icon">{ach.icon}</div>
              <div className="achievement-popup-text">
                <strong>Achievement Unlocked!</strong>
                <div>{ach.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
