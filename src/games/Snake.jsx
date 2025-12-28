import { useState, useEffect, useRef, useCallback } from 'react'
import './Snake.css'
import { soundManager } from '../utils/sounds'
import { storage } from '../utils/storage'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const GAME_SPEED = 150

function Snake({ onBack }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const gameLoopRef = useRef(null)
  const directionRef = useRef(INITIAL_DIRECTION)

  useEffect(() => {
    const stats = storage.getGameStats('snake')
    if (stats.bestScore) {
      setHighScore(stats.bestScore)
    }
  }, [])

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }
    return newFood
  }, [])

  const checkCollision = useCallback((head) => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true
    }
    // Self collision
    for (let segment of snake.slice(1)) {
      if (head.x === segment.x && head.y === segment.y) {
        return true
      }
    }
    return false
  }, [snake])

  const gameLoop = useCallback(() => {
    if (isPaused || gameOver) return

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] }
      head.x += directionRef.current.x
      head.y += directionRef.current.y

      if (checkCollision(head)) {
        setGameOver(true)
        soundManager.playError()
        // Save stats
        storage.updateGameStats('snake', {
          gamesPlayed: 1,
          bestScore: score > highScore ? score : null
        })
        if (score > highScore) {
          setHighScore(score)
        }
        return prevSnake
      }

      const newSnake = [head, ...prevSnake]

      // Check if food eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1)
        setFood(generateFood())
        soundManager.playSuccess()
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [isPaused, gameOver, food, generateFood, checkCollision, score, highScore])

  useEffect(() => {
    if (!gameOver && !isPaused) {
      gameLoopRef.current = setInterval(gameLoop, GAME_SPEED)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameOver, isPaused, gameLoop])

  const handleKeyPress = useCallback((e) => {
    if (gameOver) return

    const key = e.key
    const newDirection = { ...directionRef.current }

    if (key === 'ArrowUp' && directionRef.current.y === 0) {
      newDirection.x = 0
      newDirection.y = -1
    } else if (key === 'ArrowDown' && directionRef.current.y === 0) {
      newDirection.x = 0
      newDirection.y = 1
    } else if (key === 'ArrowLeft' && directionRef.current.x === 0) {
      newDirection.x = -1
      newDirection.y = 0
    } else if (key === 'ArrowRight' && directionRef.current.x === 0) {
      newDirection.x = 1
      newDirection.y = 0
    } else if (key === ' ' || key === 'p') {
      e.preventDefault()
      setIsPaused(prev => !prev)
      soundManager.playClick()
      return
    }

    if (newDirection.x !== directionRef.current.x || newDirection.y !== directionRef.current.y) {
      directionRef.current = newDirection
      setDirection(newDirection)
      soundManager.playMove()
    }
  }, [gameOver])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(generateFood())
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
    soundManager.playClick()
  }

  const togglePause = () => {
    if (!gameOver) {
      setIsPaused(prev => !prev)
      soundManager.playClick()
    }
  }

  const handleDirectionButton = (dir) => {
    if (gameOver || isPaused) return
    const newDirection = { ...directionRef.current }
    
    if (dir === 'up' && directionRef.current.y === 0) {
      newDirection.x = 0
      newDirection.y = -1
    } else if (dir === 'down' && directionRef.current.y === 0) {
      newDirection.x = 0
      newDirection.y = 1
    } else if (dir === 'left' && directionRef.current.x === 0) {
      newDirection.x = -1
      newDirection.y = 0
    } else if (dir === 'right' && directionRef.current.x === 0) {
      newDirection.x = 1
      newDirection.y = 0
    }

    if (newDirection.x !== directionRef.current.x || newDirection.y !== directionRef.current.y) {
      directionRef.current = newDirection
      setDirection(newDirection)
      soundManager.playMove()
    }
  }

  return (
    <div className="snake-game">
      <div className="game-header">
        <button onClick={onBack} className="back-btn">← Back</button>
        <h2>Snake Game</h2>
        <button onClick={resetGame} className="reset-btn">Reset</button>
      </div>

      <div className="snake-info">
        <div className="score-display">
          <div>Score: <strong>{score}</strong></div>
          <div>High Score: <strong>{highScore}</strong></div>
        </div>
        {isPaused && <div className="paused-indicator">⏸️ PAUSED</div>}
        {gameOver && <div className="game-over-message">Game Over! Press Reset to play again.</div>}
      </div>

      <div className="snake-board-container">
        <div 
          className="snake-board"
          style={{ 
            width: GRID_SIZE * CELL_SIZE, 
            height: GRID_SIZE * CELL_SIZE 
          }}
        >
          {/* Food */}
          <div
            className="food"
            style={{
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE
            }}
          />

          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`snake-segment ${index === 0 ? 'head' : ''}`}
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE
              }}
            />
          ))}
        </div>
      </div>

      <div className="snake-controls">
        <div className="mobile-controls">
          <button 
            onClick={() => handleDirectionButton('up')} 
            className="direction-btn up"
            disabled={gameOver || isPaused}
          >
            ↑
          </button>
          <div className="horizontal-controls">
            <button 
              onClick={() => handleDirectionButton('left')} 
              className="direction-btn left"
              disabled={gameOver || isPaused}
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
              onClick={() => handleDirectionButton('right')} 
              className="direction-btn right"
              disabled={gameOver || isPaused}
            >
              →
            </button>
          </div>
          <button 
            onClick={() => handleDirectionButton('down')} 
            className="direction-btn down"
            disabled={gameOver || isPaused}
          >
            ↓
          </button>
        </div>
        <div className="controls-hint">
          <p>Use arrow keys or buttons to control the snake</p>
          <p>Press Space or P to pause</p>
        </div>
      </div>
    </div>
  )
}

export default Snake

