import { useState, useEffect } from 'react'
import './TicTacToe.css'

function TicTacToe({ onBack }) {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState(null)
  const [gameMode, setGameMode] = useState('select') // 'select', 'computer', 'player'
  const [isComputerThinking, setIsComputerThinking] = useState(false)

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const getAvailableMoves = (squares) => {
    return squares.map((square, index) => square === null ? index : null).filter(val => val !== null)
  }

  const makeComputerMove = (squares) => {
    const availableMoves = getAvailableMoves(squares)
    if (availableMoves.length === 0) return squares

    // Simple AI: Try to win, then block player, then random
    for (let move of availableMoves) {
      const testSquares = [...squares]
      testSquares[move] = 'O'
      if (checkWinner(testSquares) === 'O') {
        return testSquares
      }
    }

    // Block player from winning
    for (let move of availableMoves) {
      const testSquares = [...squares]
      testSquares[move] = 'X'
      if (checkWinner(testSquares) === 'X') {
        const blockSquares = [...squares]
        blockSquares[move] = 'O'
        return blockSquares
      }
    }

    // Random move
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)]
    const newSquares = [...squares]
    newSquares[randomMove] = 'O'
    return newSquares
  }

  const handleClick = (index) => {
    if (board[index] || winner || isComputerThinking) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    
    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    } else {
      setIsXNext(!isXNext)
    }
  }

  // Computer move effect
  useEffect(() => {
    if (gameMode === 'computer' && !isXNext && !winner && !isComputerThinking) {
      setIsComputerThinking(true)
      setTimeout(() => {
        const newBoard = makeComputerMove(board)
        setBoard(newBoard)
        
        const gameWinner = checkWinner(newBoard)
        if (gameWinner) {
          setWinner(gameWinner)
        } else {
          setIsXNext(true)
        }
        setIsComputerThinking(false)
      }, 500) // Delay for thinking effect
    }
  }, [isXNext, gameMode, board, winner, isComputerThinking])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setIsComputerThinking(false)
  }

  const startNewGame = (mode) => {
    setGameMode(mode)
    resetGame()
  }

  const backToModeSelect = () => {
    setGameMode('select')
    resetGame()
  }

  const isDraw = !winner && board.every(cell => cell !== null)

  const getStatusMessage = () => {
    if (winner) {
      if (gameMode === 'computer') {
        return winner === 'X' ? 'You Win! 🎉' : 'Computer Wins! 🤖'
      } else {
        return winner === 'X' ? 'Player 1 Wins! 🎉' : 'Player 2 Wins! 🎉'
      }
    }
    if (isDraw) return "It's a draw! 🤝"
    if (isComputerThinking) return 'Computer is thinking... 🤔'
    
    if (gameMode === 'computer') {
      return isXNext ? 'Your turn (X)' : 'Computer\'s turn (O)'
    } else {
      return isXNext ? 'Player 1\'s turn (X)' : 'Player 2\'s turn (O)'
    }
  }

  if (gameMode === 'select') {
    return (
      <div className="tic-tac-toe">
        <div className="game-header">
          <button onClick={onBack} className="back-btn">← Back</button>
          <h2>Tic Tac Toe</h2>
          <div></div>
        </div>
        
        <div className="mode-selection">
          <h3>Choose Game Mode</h3>
          <div className="mode-buttons">
            <button onClick={() => startNewGame('computer')} className="mode-btn">
              <div className="mode-icon">🤖</div>
              <div className="mode-title">vs Computer</div>
              <div className="mode-desc">Play against AI</div>
            </button>
            <button onClick={() => startNewGame('player')} className="mode-btn">
              <div className="mode-icon">👥</div>
              <div className="mode-title">vs Player</div>
              <div className="mode-desc">Play with friend</div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="tic-tac-toe">
      <div className="game-header">
        <button onClick={backToModeSelect} className="back-btn">← Mode</button>
        <h2>Tic Tac Toe - {gameMode === 'computer' ? 'vs Computer' : 'vs Player'}</h2>
        <button onClick={resetGame} className="reset-btn">Reset</button>
      </div>
      
      <div className="game-status">
        {getStatusMessage()}
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${isComputerThinking ? 'disabled' : ''}`}
            onClick={() => handleClick(index)}
            disabled={isComputerThinking}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TicTacToe