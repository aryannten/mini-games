import { useState } from 'react'
import './App.css'
import GameCard from './components/GameCard'
import TicTacToe from './games/TicTacToe'
import NumberGuesser from './games/NumberGuesser'
import RockPaperScissors from './games/RockPaperScissors'
import ReactionTest from './games/ReactionTest'
import MemoryGame from './games/MemoryGame'

function App() {
  const [currentGame, setCurrentGame] = useState(null)

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
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      description: 'Classic X and O strategy game',
      icon: '🎮',
      component: TicTacToe,
      difficulty: 'Hard'
    }
  ]

  const handleGameSelect = (gameId) => {
    setCurrentGame(gameId)
  }

  const handleBackToHub = () => {
    setCurrentGame(null)
  }

  const currentGameData = games.find(game => game.id === currentGame)

  const isEmpty = games.length === 0

  if (currentGame && currentGameData) {
    const GameComponent = currentGameData.component
    return <GameComponent onBack={handleBackToHub} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="game-controller">🎮</div>
        <h1>Arcade Hub</h1>
        <p>Play exciting mini games right in your browser. No downloads, just pure fun!</p>
      </header>
      
      {/* stats section removed */}
      
      <main className={`games-grid ${isEmpty ? 'empty' : ''}`}>
        {games.map(game => (
          <GameCard
            key={game.id}
            title={game.title}
            description={game.description}
            icon={game.icon}
            difficulty={game.difficulty}
            onClick={() => handleGameSelect(game.id)}
          />
        ))}
      </main>
      
      <footer className="app-footer">
  <p>!..........!</p>
      </footer>
    </div>
  )
}

export default App
