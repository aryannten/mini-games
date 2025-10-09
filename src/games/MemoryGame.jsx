import { useState, useEffect } from 'react'
import './MemoryGame.css'

function MemoryGame({ onBack }) {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [difficulty, setDifficulty] = useState('easy')

  const difficulties = {
    easy: { pairs: 6, gridSize: '4x3' },
    medium: { pairs: 8, gridSize: '4x4' },
    hard: { pairs: 12, gridSize: '6x4' }
  }

  const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎪', '🎺', '🎸', '🎹', '🎤', '🎧', '🎬', '🎞️', '🎊', '🎉']

  const initializeGame = (diff = difficulty) => {
    const pairCount = difficulties[diff].pairs
    const gameEmojis = emojis.slice(0, pairCount)
    const cardPairs = [...gameEmojis, ...gameEmojis]
    
    // Shuffle cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5).map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }))
    
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedCards([])
    setMoves(0)
    setGameWon(false)
  }

  useEffect(() => {
    initializeGame()
  }, [difficulty])

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setTimeout(() => {
          setMatchedCards(prev => [...prev, first, second])
          setFlippedCards([])
        }, 1000)
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([])
        }, 1000)
      }
      setMoves(prev => prev + 1)
    }
  }, [flippedCards, cards])

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true)
    }
  }, [matchedCards, cards])

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || 
        flippedCards.includes(cardId) || 
        matchedCards.includes(cardId)) {
      return
    }
    
    setFlippedCards(prev => [...prev, cardId])
  }

  const changeDifficulty = (newDiff) => {
    setDifficulty(newDiff)
  }

  const isCardVisible = (cardId) => {
    return flippedCards.includes(cardId) || matchedCards.includes(cardId)
  }

  return (
    <div className="memory-game">
      <div className="game-header">
        <button onClick={onBack} className="back-btn">← Back</button>
        <h2>Memory Game</h2>
        <button onClick={() => initializeGame()} className="restart-btn">Restart</button>
      </div>

      <div className="difficulty-selector">
        <h3>Difficulty:</h3>
        <div className="difficulty-buttons">
          {Object.entries(difficulties).map(([key, value]) => (
            <button
              key={key}
              onClick={() => changeDifficulty(key)}
              className={difficulty === key ? 'active' : ''}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)} ({value.gridSize})
            </button>
          ))}
        </div>
      </div>

      <div className="game-info">
        <div className="moves">Moves: {moves}</div>
        <div className="matches">
          Matches: {matchedCards.length / 2} / {difficulties[difficulty].pairs}
        </div>
      </div>

      {gameWon && (
        <div className="win-message">
          🎉 Congratulations! You won in {moves} moves! 🎉
        </div>
      )}

      <div className={`card-grid ${difficulty}`}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${isCardVisible(card.id) ? 'flipped' : ''} ${matchedCards.includes(card.id) ? 'matched' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MemoryGame