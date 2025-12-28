import { useState, useEffect, useRef } from 'react'
import './FlappyBird.css'
import { soundManager } from '../utils/sounds'
import { storage } from '../utils/storage'

const GRAVITY = 0.5
const JUMP_STRENGTH = -8
const PIPE_SPEED = 3
const PIPE_GAP = 150
const PIPE_SPACING = 200

function FlappyBird({ onBack }) {
  const [birdY, setBirdY] = useState(250)
  const [birdVelocity, setBirdVelocity] = useState(0)
  const [pipes, setPipes] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const pipeIdRef = useRef(0)
  const gameLoopRef = useRef(null)
  const birdYRef = useRef(250)
  const birdVelocityRef = useRef(0)

  useEffect(() => {
    birdYRef.current = birdY
  }, [birdY])

  useEffect(() => {
    birdVelocityRef.current = birdVelocity
  }, [birdVelocity])

  useEffect(() => {
    const stats = storage.getGameStats('flappybird')
    if (stats.bestScore) {
      setHighScore(stats.bestScore)
    }
  }, [])

  const jump = () => {
    if (!isStarted && !gameOver) {
      setIsStarted(true)
    }
    if (!gameOver) {
      setBirdVelocity(JUMP_STRENGTH)
      birdVelocityRef.current = JUMP_STRENGTH
      soundManager.playMove()
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') {
      e.preventDefault()
      jump()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isStarted, gameOver])

  const checkCollision = (pipe, currentBirdY) => {
    const birdX = 100
    const birdSize = 30

    if (
      birdX < pipe.x + 50 &&
      birdX + birdSize > pipe.x &&
      (currentBirdY < pipe.topHeight || currentBirdY + birdSize > pipe.topHeight + PIPE_GAP)
    ) {
      return true
    }
    return false
  }

  useEffect(() => {
    if (!isStarted || gameOver) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
      return
    }

    gameLoopRef.current = setInterval(() => {
      // Update bird velocity
      birdVelocityRef.current += GRAVITY
      setBirdVelocity(birdVelocityRef.current)
      
      // Update bird position
      const newY = birdYRef.current + birdVelocityRef.current
      
      if (newY < 0 || newY > 500 - 30) {
        setGameOver(true)
        soundManager.playError()
        setScore(currentScore => {
          if (currentScore > highScore) {
            setHighScore(currentScore)
            storage.updateGameStats('flappybird', {
              gamesPlayed: 1,
              bestScore: currentScore
            })
          } else {
            storage.updateGameStats('flappybird', {
              gamesPlayed: 1
            })
          }
          return currentScore
        })
      } else {
        birdYRef.current = newY
        setBirdY(newY)
      }

      // Update pipes
      setPipes(prev => {
        const updated = prev
          .map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
          .filter(pipe => pipe.x > -50)

        // Check collisions and score
        updated.forEach(pipe => {
          if (checkCollision(pipe, birdYRef.current)) {
            setGameOver(true)
            soundManager.playError()
            setScore(currentScore => {
              if (currentScore > highScore) {
                setHighScore(currentScore)
                storage.updateGameStats('flappybird', {
                  gamesPlayed: 1,
                  bestScore: currentScore
                })
              } else {
                storage.updateGameStats('flappybird', {
                  gamesPlayed: 1
                })
              }
              return currentScore
            })
          }

          // Score point
          if (pipe.x < 100 && pipe.x + 50 > 100 && !pipe.passed) {
            pipe.passed = true
            setScore(prev => prev + 1)
            soundManager.playSuccess()
          }
        })

        // Generate new pipes
        if (updated.length === 0 || updated[updated.length - 1].x < 600 - PIPE_SPACING) {
          const topHeight = Math.random() * (500 - PIPE_GAP - 100) + 50
          updated.push({
            id: pipeIdRef.current++,
            x: 600,
            topHeight,
            passed: false
          })
        }

        return updated
      })
    }, 16)

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }
  }, [isStarted, gameOver, highScore])

  const resetGame = () => {
    setBirdY(250)
    setBirdVelocity(0)
    birdYRef.current = 250
    birdVelocityRef.current = 0
    setPipes([])
    setScore(0)
    setGameOver(false)
    setIsStarted(false)
    pipeIdRef.current = 0
    soundManager.playClick()
  }

  return (
    <div className="flappy-bird">
      <div className="game-header">
        <button onClick={onBack} className="back-btn">← Back</button>
        <h2>Flappy Bird</h2>
        <button onClick={resetGame} className="reset-btn">Reset</button>
      </div>

      <div className="flappy-info">
        <div className="score-display">
          <div>Score: <strong>{score}</strong></div>
          <div>High Score: <strong>{highScore}</strong></div>
        </div>
        {gameOver && <div className="game-over-message">Game Over! Press Reset to play again.</div>}
        {!isStarted && !gameOver && (
          <div className="start-message">
            <p>Press Space or Click to Start!</p>
            <p>Tap/Click to fly up</p>
          </div>
        )}
      </div>

      <div className="flappy-container" onClick={jump}>
        <div className="sky">
          {/* Bird */}
          <div
            className="bird"
            style={{
              left: '100px',
              top: `${birdY}px`,
              transform: `rotate(${Math.min(birdVelocity * 2, 30)}deg)`
            }}
          >
            🐦
          </div>

          {/* Pipes */}
          {pipes.map(pipe => (
            <div key={pipe.id}>
              <div
                className="pipe pipe-top"
                style={{
                  left: `${pipe.x}px`,
                  height: `${pipe.topHeight}px`
                }}
              />
              <div
                className="pipe pipe-bottom"
                style={{
                  left: `${pipe.x}px`,
                  top: `${pipe.topHeight + PIPE_GAP}px`,
                  height: `${500 - pipe.topHeight - PIPE_GAP}px`
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="controls-hint">
        <p>Press Space, ↑, or W to fly | Click to fly</p>
      </div>
    </div>
  )
}

export default FlappyBird
