import { useState, useEffect, useRef } from 'react'
import './Breakout.css'
import { soundManager } from '../utils/sounds'
import { storage } from '../utils/storage'

const PADDLE_WIDTH = 100
const PADDLE_HEIGHT = 15
const BALL_SIZE = 15
const BRICK_ROWS = 5
const BRICK_COLS = 8
const BRICK_WIDTH = 60
const BRICK_HEIGHT = 25
const BRICK_GAP = 5

function Breakout({ onBack }) {
  const [paddleX, setPaddleX] = useState(250)
  const [ball, setBall] = useState({ x: 300, y: 400, dx: 3, dy: -3 })
  const [bricks, setBricks] = useState([])
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const mouseXRef = useRef(250)

  useEffect(() => {
    const stats = storage.getGameStats('breakout')
    if (stats.bestScore) {
      setHighScore(stats.bestScore)
    }
    initializeBricks()
  }, [])

  const initializeBricks = () => {
    const newBricks = []
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        newBricks.push({
          id: `${row}-${col}`,
          x: col * (BRICK_WIDTH + BRICK_GAP) + BRICK_GAP,
          y: row * (BRICK_HEIGHT + BRICK_GAP) + BRICK_GAP + 50,
          hit: false
        })
      }
    }
    setBricks(newBricks)
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseXRef.current = e.clientX - rect.left - PADDLE_WIDTH / 2
    setPaddleX(Math.max(0, Math.min(mouseXRef.current, 600 - PADDLE_WIDTH)))
  }

  const startGame = () => {
    if (!isStarted && !gameOver && !gameWon) {
      setIsStarted(true)
      soundManager.playClick()
    }
  }

  const checkCollision = (ball, rect) => {
    return (
      ball.x < rect.x + rect.width &&
      ball.x + BALL_SIZE > rect.x &&
      ball.y < rect.y + rect.height &&
      ball.y + BALL_SIZE > rect.y
    )
  }

  const gameLoop = () => {
    if (!isStarted || gameOver || gameWon) return

    setBall(prev => {
      let newBall = { ...prev, x: prev.x + prev.dx, y: prev.y + prev.dy }

      // Wall collisions
      if (newBall.x <= 0 || newBall.x >= 600 - BALL_SIZE) {
        newBall.dx = -newBall.dx
        soundManager.playClick()
      }
      if (newBall.y <= 0) {
        newBall.dy = -newBall.dy
        soundManager.playClick()
      }

      // Paddle collision
      if (
        newBall.y + BALL_SIZE >= 500 - PADDLE_HEIGHT &&
        newBall.y < 500 &&
        newBall.x + BALL_SIZE > paddleX &&
        newBall.x < paddleX + PADDLE_WIDTH
      ) {
        const hitPos = (newBall.x - paddleX) / PADDLE_WIDTH
        newBall.dx = (hitPos - 0.5) * 6
        newBall.dy = -Math.abs(newBall.dy)
        newBall.y = 500 - PADDLE_HEIGHT - BALL_SIZE
        soundManager.playMatch()
      }

      // Brick collisions
      setBricks(prev => {
        const updated = prev.map(brick => {
          if (!brick.hit && checkCollision(newBall, {
            x: brick.x,
            y: brick.y,
            width: BRICK_WIDTH,
            height: BRICK_HEIGHT
          })) {
            brick.hit = true
            setScore(prevScore => prevScore + 10)
            soundManager.playSuccess()
            
            // Determine bounce direction
            const ballCenterX = newBall.x + BALL_SIZE / 2
            const ballCenterY = newBall.y + BALL_SIZE / 2
            const brickCenterX = brick.x + BRICK_WIDTH / 2
            const brickCenterY = brick.y + BRICK_HEIGHT / 2
            
            const dx = ballCenterX - brickCenterX
            const dy = ballCenterY - brickCenterY
            
            if (Math.abs(dx) > Math.abs(dy)) {
              newBall.dx = dx > 0 ? Math.abs(newBall.dx) : -Math.abs(newBall.dx)
            } else {
              newBall.dy = dy > 0 ? Math.abs(newBall.dy) : -Math.abs(newBall.dy)
            }
          }
          return brick
        })
        return updated
      })

      // Ball fell
      if (newBall.y > 500) {
        setLives(prev => {
          const newLives = prev - 1
          if (newLives <= 0) {
            setGameOver(true)
            soundManager.playError()
            if (score > highScore) {
              setHighScore(score)
              storage.updateGameStats('breakout', {
                gamesPlayed: 1,
                bestScore: score
              })
            } else {
              storage.updateGameStats('breakout', {
                gamesPlayed: 1
              })
            }
          } else {
            soundManager.playError()
            setIsStarted(false)
            setBall({ x: 300, y: 400, dx: 3, dy: -3 })
          }
          return newLives
        })
      }

      // Check win
      if (bricks.every(brick => brick.hit)) {
        setGameWon(true)
        soundManager.playWin()
        if (score > highScore) {
          setHighScore(score)
          storage.updateGameStats('breakout', {
            gamesPlayed: 1,
            gamesWon: 1,
            bestScore: score
          })
        } else {
          storage.updateGameStats('breakout', {
            gamesPlayed: 1,
            gamesWon: 1
          })
        }
      }

      return newBall
    })
  }

  useEffect(() => {
    if (isStarted && !gameOver && !gameWon) {
      const interval = setInterval(gameLoop, 16)
      return () => clearInterval(interval)
    }
  }, [isStarted, gameOver, gameWon, paddleX, bricks, score, highScore])

  const resetGame = () => {
    setBall({ x: 300, y: 400, dx: 3, dy: -3 })
    setPaddleX(250)
    setScore(0)
    setLives(3)
    setGameOver(false)
    setGameWon(false)
    setIsStarted(false)
    initializeBricks()
    soundManager.playClick()
  }

  return (
    <div className="breakout">
      <div className="game-header">
        <button onClick={onBack} className="back-btn">← Back</button>
        <h2>Breakout</h2>
        <button onClick={resetGame} className="reset-btn">Reset</button>
      </div>

      <div className="breakout-info">
        <div className="score-display">
          <div>Score: <strong>{score}</strong></div>
          <div>High Score: <strong>{highScore}</strong></div>
          <div>Lives: <strong>{lives}</strong></div>
        </div>
        {gameOver && <div className="game-over-message">Game Over! Press Reset to play again.</div>}
        {gameWon && <div className="game-won-message">🎉 You Won! 🎉</div>}
        {!isStarted && !gameOver && !gameWon && (
          <div className="start-message">Move mouse to control paddle, click to start!</div>
        )}
      </div>

      <div 
        className="breakout-container"
        onMouseMove={handleMouseMove}
        onClick={startGame}
      >
        {/* Bricks */}
        {bricks.map(brick => (
          !brick.hit && (
            <div
              key={brick.id}
              className="brick"
              style={{
                left: `${brick.x}px`,
                top: `${brick.y}px`,
                width: `${BRICK_WIDTH}px`,
                height: `${BRICK_HEIGHT}px`
              }}
            />
          )
        ))}

        {/* Paddle */}
        <div
          className="paddle"
          style={{
            left: `${paddleX}px`,
            top: `${500 - PADDLE_HEIGHT}px`,
            width: `${PADDLE_WIDTH}px`,
            height: `${PADDLE_HEIGHT}px`
          }}
        />

        {/* Ball */}
        {isStarted && (
          <div
            className="ball"
            style={{
              left: `${ball.x}px`,
              top: `${ball.y}px`,
              width: `${BALL_SIZE}px`,
              height: `${BALL_SIZE}px`
            }}
          />
        )}
      </div>

      <div className="controls-hint">
        <p>Move mouse to control paddle | Click to start ball</p>
      </div>
    </div>
  )
}

export default Breakout

