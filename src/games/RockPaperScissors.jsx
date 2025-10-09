import { useState, useEffect } from 'react'
import './RockPaperScissors.css'

function RockPaperScissors({ onBack }) {
  const [playerChoice, setPlayerChoice] = useState('')
  const [computerChoice, setComputerChoice] = useState('')
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [result, setResult] = useState('')
  const [gameHistory, setGameHistory] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)

  const choices = [
    { name: 'rock', emoji: '🪨', beats: 'scissors' },
    { name: 'paper', emoji: '📄', beats: 'rock' },
    { name: 'scissors', emoji: '✂️', beats: 'paper' }
  ]

  const getRandomChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)]
  }

  const playGame = (playerChoice) => {
    setIsPlaying(true)
    setPlayerChoice(playerChoice)
    
    setTimeout(() => {
      const computerChoice = getRandomChoice()
      setComputerChoice(computerChoice)
      
      let gameResult = ''
      if (playerChoice.name === computerChoice.name) {
        gameResult = "It's a tie!"
      } else if (playerChoice.beats === computerChoice.name) {
        gameResult = 'You win!'
        setPlayerScore(prev => prev + 1)
      } else {
        gameResult = 'Computer wins!'
        setComputerScore(prev => prev + 1)
      }
      
      setResult(gameResult)
      setGameHistory(prev => [...prev, {
        player: playerChoice,
        computer: computerChoice,
        result: gameResult
      }])
      
      setIsPlaying(false)
    }, 1000)
  }

  const resetGame = () => {
    setPlayerChoice('')
    setComputerChoice('')
    setPlayerScore(0)
    setComputerScore(0)
    setResult('')
    setGameHistory([])
    setIsPlaying(false)
  }

  return (
    <div className="rock-paper-scissors">
      <div className="game-header">
        <button onClick={onBack} className="back-btn">← Back</button>
        <h2>Rock Paper Scissors</h2>
        <button onClick={resetGame} className="reset-btn">Reset</button>
      </div>

      <div className="scoreboard">
        <div className="score">
          <h3>You</h3>
          <span className="score-number">{playerScore}</span>
        </div>
        <div className="vs">VS</div>
        <div className="score">
          <h3>Computer</h3>
          <span className="score-number">{computerScore}</span>
        </div>
      </div>

      <div className="game-area">
        <div className="choice-display">
          <div className="player-choice">
            <h3>Your Choice</h3>
            <div className="choice-emoji">
              {playerChoice ? playerChoice.emoji : '❓'}
            </div>
          </div>
          
          <div className="computer-choice">
            <h3>Computer's Choice</h3>
            <div className="choice-emoji">
              {isPlaying ? '🤔' : computerChoice ? computerChoice.emoji : '❓'}
            </div>
          </div>
        </div>

        {result && (
          <div className={`result ${result.includes('You win') ? 'win' : result.includes('Computer wins') ? 'lose' : 'tie'}`}>
            {result}
          </div>
        )}
      </div>

      <div className="choices">
        <h3>Choose your weapon:</h3>
        <div className="choice-buttons">
          {choices.map((choice) => (
            <button
              key={choice.name}
              onClick={() => playGame(choice)}
              disabled={isPlaying}
              className="choice-btn"
            >
              <span className="choice-emoji">{choice.emoji}</span>
              <span className="choice-name">{choice.name}</span>
            </button>
          ))}
        </div>
      </div>

      {gameHistory.length > 0 && (
        <div className="game-history">
          <h3>Last 5 Games:</h3>
          <div className="history-list">
            {gameHistory.slice(-5).reverse().map((game, index) => (
              <div key={index} className="history-item">
                <span>{game.player.emoji} vs {game.computer.emoji}</span>
                <span className={`history-result ${game.result.includes('You win') ? 'win' : game.result.includes('Computer wins') ? 'lose' : 'tie'}`}>
                  {game.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RockPaperScissors