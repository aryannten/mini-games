import { useState, useEffect, useRef } from 'react'
import './TicTacToe.css'
import { storage } from '../utils/storage'

function TicTacToe({ onBack }) {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState(null)
  const [gameMode, setGameMode] = useState('select') // 'select', 'computer', 'player'
  const [isComputerThinking, setIsComputerThinking] = useState(false)
  const [xWins, setXWins] = useState(0)
  const [oWins, setOWins] = useState(0)
  const [draws, setDraws] = useState(0)
  const drawCountedRef = useRef(false)

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
      if (gameWinner === 'X') {
        setXWins(prev => prev + 1)
        // Save stats - only count as win if playing vs computer
        if (gameMode === 'computer') {
          storage.updateGameStats('tictactoe', {
            gamesPlayed: 1,
            gamesWon: 1
          })
        } else {
          // Player vs Player - just track game played
          storage.updateGameStats('tictactoe', {
            gamesPlayed: 1,
            gamesWon: 0
          })
        }
      } else {
        setOWins(prev => prev + 1)
        // O wins - in computer mode this is computer win, in player mode it's player 2
        storage.updateGameStats('tictactoe', {
          gamesPlayed: 1,
          gamesWon: 0 // Don't count computer wins or player 2 wins as player achievement
        })
      }
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
          if (gameWinner === 'O') {
            setOWins(prev => prev + 1)
            // Computer wins - don't count as player win
            storage.updateGameStats('tictactoe', {
              gamesPlayed: 1,
              gamesWon: 0
            })
          } else {
            setXWins(prev => prev + 1)
            // Player wins
            storage.updateGameStats('tictactoe', {
              gamesPlayed: 1,
              gamesWon: 1
            })
          }
        } else {
          setIsXNext(true)
        }
        setIsComputerThinking(false)
      }, 500) // Delay for thinking effect
    }
  }, [isXNext, gameMode, board, winner, isComputerThinking])

  const isDraw = !winner && board.every(cell => cell !== null)
  
  useEffect(() => {
    if (isDraw && !winner && !drawCountedRef.current) {
      drawCountedRef.current = true
      setDraws(prev => prev + 1)
      // Save stats for draw
      storage.updateGameStats('tictactoe', {
        gamesPlayed: 1,
        gamesWon: 0
      })
    }
    if (winner || !isDraw) {
      drawCountedRef.current = false
    }
  }, [isDraw, winner])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setIsComputerThinking(false)
    drawCountedRef.current = false
  }

  const newRound = () => {
    resetGame()
  }

  const resetScore = () => {
    setXWins(0)
    setOWins(0)
    setDraws(0)
    resetGame()
  }

  const startNewGame = (mode) => {
    setGameMode(mode)
    resetGame()
  }

  const backToModeSelect = () => {
    setGameMode('select')
    resetGame()
  }

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
        <div className="header-buttons">
          <button onClick={newRound} className="new-round-btn">New Round</button>
          <button onClick={resetScore} className="reset-btn">Reset Score</button>
        </div>
      </div>

      <div className="score-display">
        <div className="score-item">
          <span className="score-label">{gameMode === 'computer' ? 'You' : 'Player 1'}</span>
          <span className="score-value">{xWins}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Draws</span>
          <span className="score-value">{draws}</span>
        </div>
        <div className="score-item">
          <span className="score-label">{gameMode === 'computer' ? 'Computer' : 'Player 2'}</span>
          <span className="score-value">{oWins}</span>
        </div>
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