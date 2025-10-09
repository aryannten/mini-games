import './GameCard.css'

function GameCard({ title, description, icon, onClick, difficulty = 'Medium' }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#22c55e'
      case 'medium': return '#f59e0b'
      case 'hard': return '#ef4444'
      default: return '#f59e0b'
    }
  }

  return (
    <div className="game-card" onClick={onClick}>
      <div className="game-card-header">
        <div className="game-icon-container">
          <div className="game-icon">{icon}</div>
        </div>
        <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(difficulty) }}>
          {difficulty}
        </div>
      </div>
      
      <div className="game-info">
        <h3 className="game-title">{title}</h3>
        <p className="game-description">{description}</p>
      </div>
      
      <button className="play-button">
        <span className="play-icon">▶</span>
        Play Now
      </button>
    </div>
  )
}

export default GameCard