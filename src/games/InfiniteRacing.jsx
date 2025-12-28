import { useState, useEffect, useRef, useCallback } from 'react'
import './InfiniteRacing.css'
import { soundManager } from '../utils/sounds'
import { storage } from '../utils/storage'

const CONTAINER_WIDTH = 600
const CAR_WIDTH = 40
const CAR_HEIGHT = 60
const LANE_WIDTH = CONTAINER_WIDTH / 3
const SPEED_INCREMENT = 0.5
const INITIAL_SPEED = 2

function InfiniteRacing({ onBack }) {
  const [position, setPosition] = useState(1) // 0 = left, 1 = center, 2 = right
  const [obstacles, setObstacles] = useState([])
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(INITIAL_SPEED)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [highScore, setHighScore] = useState(0)
  
  const gameLoopRef = useRef(null)
  const obstacleIdRef = useRef(0)
  const positionRef = useRef(1)
  const scoreRef = useRef(0)
  const speedRef = useRef(INITIAL_SPEED)
  const gameOverRef = useRef(false)
  const isPausedRef = useRef(false)

  useEffect(() => {
    const stats = storage.getGameStats('infiniteracing')
    if (stats.bestScore) {
      setHighScore(stats.bestScore)
    }
  }, [])

  useEffect(() => {
    positionRef.current = position
  }, [position])

  useEffect(() => {
    scoreRef.current = score
  }, [score])

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  useEffect(() => {
    gameOverRef.current = gameOver
  }, [gameOver])

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  const getLaneX = useCallback((lane) => {
    return (lane * LANE_WIDTH) + (LANE_WIDTH / 2) - (CAR_WIDTH / 2)
  }, [])

  const moveLeft = useCallback(() => {
    if (!gameOverRef.current && !isPausedRef.current && positionRef.current > 0) {
      const newPos = positionRef.current - 1
      positionRef.current = newPos
      setPosition(newPos)
      soundManager.playMove()
    }
  }, [])

  const moveRight = useCallback(() => {
    if (!gameOverRef.current && !isPausedRef.current && positionRef.current < 2) {
      const newPos = positionRef.current + 1
      positionRef.current = newPos
      setPosition(newPos)
      soundManager.playMove()
    }
  }, [])

  const handleKeyPress = useCallback((e) => {
    if (gameOverRef.current || isPausedRef.current) {
      if (e.key === ' ' || e.key === 'p') {
        setIsPaused(prev => !prev)
        soundManager.playClick()
      }
      return
    }

    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      e.preventDefault()
      moveLeft()
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      e.preventDefault()
      moveRight()
    } else if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
      e.preventDefault()
      setIsPaused(prev => !prev)
      soundManager.playClick()
    }
  }, [moveLeft, moveRight])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const checkCollision = useCallback((obstacle) => {
    const playerX = getLaneX(positionRef.current)
    const playerY = 520
    const obstacleX = getLaneX(obstacle.lane)
    const obstacleY = obstacle.y

    return (
      playerX < obstacleX + CAR_WIDTH &&
      playerX + CAR_WIDTH > obstacleX &&
      playerY < obstacleY + CAR_HEIGHT &&
      playerY + CAR_HEIGHT > obstacleY
    )
  }, [getLaneX])

  useEffect(() => {
    if (isPausedRef.current || gameOverRef.current) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
      return
    }

    gameLoopRef.current = setInterval(() => {
      // Update obstacles
      setObstacles(prev => {
        let updated = prev
          .map(obs => ({ ...obs, y: obs.y + speedRef.current }))
          .filter(obs => obs.y < 700)

        // Check collisions
        const currentPos = positionRef.current
        const currentScore = scoreRef.current
        
        updated.forEach(obs => {
          if (checkCollision(obs)) {
            if (!gameOverRef.current) {
              gameOverRef.current = true
              setGameOver(true)
              soundManager.playError()
              
              if (currentScore > highScore) {
                setHighScore(currentScore)
                storage.updateGameStats('infiniteracing', {
                  gamesPlayed: 1,
                  bestScore: currentScore
                })
              } else {
                storage.updateGameStats('infiniteracing', {
                  gamesPlayed: 1
                })
              }
            }
          }
        })

        // Generate new obstacles
        if (Math.random() < 0.015) {
          updated.push({
            id: obstacleIdRef.current++,
            lane: Math.floor(Math.random() * 3),
            y: -CAR_HEIGHT
          })
        }

        return updated
      })

      // Update score
      setScore(prev => {
        const newScore = prev + 1
        scoreRef.current = newScore
        
        if (newScore % 100 === 0 && newScore > 0) {
          setSpeed(prevSpeed => {
            const newSpeed = Math.min(prevSpeed + SPEED_INCREMENT, 10)
            speedRef.current = newSpeed
            soundManager.playSuccess()
            return newSpeed
          })
        }
        
        return newScore
      })
    }, 16) // ~60fps

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }
  }, [gameOver, isPaused, highScore, checkCollision])

  const resetGame = () => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current)
      gameLoopRef.current = null
    }
    
    setPosition(1)
    positionRef.current = 1
    setObstacles([])
    setScore(0)
    scoreRef.current = 0
    setSpeed(INITIAL_SPEED)
    speedRef.current = INITIAL_SPEED
    setGameOver(false)
    gameOverRef.current = false
    setIsPaused(false)
    isPausedRef.current = false
    obstacleIdRef.current = 0
    soundManager.playClick()
  }

  const togglePause = () => {
    if (!gameOverRef.current) {
      setIsPaused(prev => {
        const newPaused = !prev
        isPausedRef.current = newPaused
        return newPaused
      })
      soundManager.playClick()
    }
  }

  return (
    <div className="infinite-racing">
      <div className="game-header">
        <button onClick={onBack} className="back-btn">← Back</button>
        <h2>Infinite Racing</h2>
        <button onClick={resetGame} className="reset-btn">Reset</button>
      </div>

      <div className="racing-info">
        <div className="score-display">
          <div>Score: <strong>{score}</strong></div>
          <div>High Score: <strong>{highScore}</strong></div>
          <div>Speed: <strong>{speed.toFixed(1)}x</strong></div>
        </div>
        {isPaused && <div className="paused-indicator">⏸️ PAUSED</div>}
        {gameOver && <div className="game-over-message">Game Over! Press Reset to play again.</div>}
      </div>

      <div className="racing-container">
        <div className="road">
          <div className="road-lines"></div>
          <div className="road-lines"></div>
          
          {/* Player Car */}
          <div
            className="player-car"
            style={{
              left: `${getLaneX(position)}px`,
              bottom: '80px'
            }}
          >
            🚗
          </div>

          {/* Obstacles */}
          {obstacles.map(obs => (
            <div
              key={obs.id}
              className="obstacle-car"
              style={{
                left: `${getLaneX(obs.lane)}px`,
                top: `${obs.y}px`
              }}
            >
              🚙
            </div>
          ))}
        </div>
      </div>

      <div className="racing-controls">
        <div className="mobile-controls">
          <button 
            onClick={moveLeft} 
            className="direction-btn left" 
            disabled={gameOver || isPaused || position === 0}
          >
            ←
          </button>
          <button 
            onClick={togglePause} 
            className="pause-btn" 
            disabled={gameOver}
          >
            {isPaused ? '▶' : '⏸'}
          </button>
          <button 
            onClick={moveRight} 
            className="direction-btn right" 
            disabled={gameOver || isPaused || position === 2}
          >
            →
          </button>
        </div>
        <div className="controls-hint">
          <p>Use ← → arrow keys or A/D to move</p>
          <p>Press Space or P to pause</p>
        </div>
      </div>
    </div>
  )
}

export default InfiniteRacing
