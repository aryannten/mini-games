import { useState, useEffect } from 'react'
import './NumberGuesser.css'

function NumberGuesser({ onBack }) {
  const [targetNumber, setTargetNumber] = useState(0)
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState('')
  const [gameWon, setGameWon] = useState(false)
  const [range, setRange] = useState({ min: 1, max: 100 })
  const [guessHistory, setGuessHistory] = useState([])

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const newTarget = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
    setTargetNumber(newTarget)
    setGuess('')
    setAttempts(0)
    setMessage(`Guess a number between ${range.min} and ${range.max}!`)
    setGameWon(false)
    setGuessHistory([])
  }

  const handleGuess = () => {
    const numGuess = parseInt(guess)
    
    if (isNaN(numGuess) || numGuess < range.min || numGuess > range.max) {
      setMessage(`Please enter a valid number between ${range.min} and ${range.max}`)
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    
    const newHistory = [...guessHistory, { guess: numGuess, attempt: newAttempts }]
    setGuessHistory(newHistory)

    if (numGuess === targetNumber) {
      setMessage(`🎉 Congratulations! You guessed it in ${newAttempts} attempts!`)
      setGameWon(true)
    } else if (numGuess < targetNumber) {
      setMessage(`Too low! Try a higher number.`)
    } else {
      setMessage(`Too high! Try a lower number.`)
    }
    
    setGuess('')
  }

  const handleRangeChange = (newRange) => {
    setRange(newRange)
    startNewGame()
  }

  return (
    <div className="number-guesser">
      <div className="game-header">
        <button onClick={onBack} className="back-btn">← Back</button>
        <h2>Number Guesser</h2>
        <button onClick={startNewGame} className="new-game-btn">New Game</button>
      </div>

      <div className="difficulty-selector">
        <h3>Difficulty:</h3>
        <div className="difficulty-buttons">
          <button 
            onClick={() => handleRangeChange({ min: 1, max: 10 })}
            className={range.max === 10 ? 'active' : ''}
          >
            Easy (1-10)
          </button>
          <button 
            onClick={() => handleRangeChange({ min: 1, max: 50 })}
            className={range.max === 50 ? 'active' : ''}
          >
            Medium (1-50)
          </button>
          <button 
            onClick={() => handleRangeChange({ min: 1, max: 100 })}
            className={range.max === 100 ? 'active' : ''}
          >
            Hard (1-100)
          </button>
        </div>
      </div>

      <div className="game-info">
        <p>Range: {range.min} - {range.max}</p>
        <p>Attempts: {attempts}</p>
      </div>

      <div className="message">{message}</div>

      {!gameWon && (
        <div className="input-section">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
            placeholder="Enter your guess"
            min={range.min}
            max={range.max}
          />
          <button onClick={handleGuess} disabled={!guess}>
            Guess!
          </button>
        </div>
      )}

      {guessHistory.length > 0 && (
        <div className="guess-history">
          <h3>Your Guesses:</h3>
          <div className="history-list">
            {guessHistory.map((item, index) => (
              <span key={index} className="history-item">
                {item.guess}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NumberGuesser