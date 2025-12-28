import './InstructionsModal.css'
import { soundManager } from '../utils/sounds'

function InstructionsModal({ gameId, onClose }) {
  const instructions = {
    all: {
      title: 'Game Instructions',
      content: (
        <div className="instructions-content">
          <p>Welcome to Arcade Hub! Here's how to play each game:</p>
          <div className="game-instructions-list">
            <div className="instruction-item">
              <h3>🧠 Memory Match</h3>
              <p>Flip cards to find matching pairs. Try to complete the game with as few moves as possible!</p>
            </div>
            <div className="instruction-item">
              <h3>⚡ Reaction Test</h3>
              <p>Wait for the screen to turn green, then click as fast as you can! Test your reflexes.</p>
            </div>
            <div className="instruction-item">
              <h3>🏆 Number Guesser</h3>
              <p>Guess the secret number. You'll get hints if your guess is too high or too low.</p>
            </div>
            <div className="instruction-item">
              <h3>✂️ Rock Paper Scissors</h3>
              <p>Choose rock, paper, or scissors to beat the computer. Best of luck!</p>
            </div>
            <div className="instruction-item">
              <h3>🎮 Tic Tac Toe</h3>
              <p>Get three in a row to win! Play against the computer or a friend.</p>
            </div>
            <div className="instruction-item">
              <h3>🐍 Snake</h3>
              <p>Control the snake to eat food and grow. Avoid walls and yourself!</p>
            </div>
            <div className="instruction-item">
              <h3>🏎️ Infinite Racing</h3>
              <p>Endless racing game - avoid obstacles and survive as long as possible!</p>
            </div>
            <div className="instruction-item">
              <h3>🐦 Flappy Bird</h3>
              <p>Navigate through pipes by tapping to fly. Don't hit the pipes!</p>
            </div>
            <div className="instruction-item">
              <h3>🎯 Breakout</h3>
              <p>Break all the bricks using your paddle. Don't let the ball fall!</p>
            </div>
          </div>
        </div>
      )
    },
    infiniteracing: {
      title: 'Infinite Racing Instructions',
      content: (
        <div className="instructions-content">
          <ol>
            <li>Use arrow keys (← →) or A/D to move left and right</li>
            <li>Avoid the oncoming cars</li>
            <li>Your score increases as you survive longer</li>
            <li>Speed increases every 100 points</li>
            <li>Press Space or P to pause</li>
          </ol>
        </div>
      )
    },
    flappybird: {
      title: 'Flappy Bird Instructions',
      content: (
        <div className="instructions-content">
          <ol>
            <li>Press Space, ↑, or W to make the bird fly up</li>
            <li>Click anywhere on the screen to fly</li>
            <li>Navigate through the gaps between pipes</li>
            <li>Don't hit the pipes or the ground</li>
            <li>Score points by passing through pipes</li>
          </ol>
        </div>
      )
    },
    breakout: {
      title: 'Breakout Instructions',
      content: (
        <div className="instructions-content">
          <ol>
            <li>Move your mouse to control the paddle</li>
            <li>Click to start the ball</li>
            <li>Break all the bricks to win</li>
            <li>You have 3 lives - don't let the ball fall</li>
            <li>Each brick is worth 10 points</li>
          </ol>
        </div>
      )
    },
    snake: {
      title: 'Snake Game Instructions',
      content: (
        <div className="instructions-content">
          <ol>
            <li>Use arrow keys (or on-screen buttons) to control the snake</li>
            <li>Eat the red food to grow and increase your score</li>
            <li>Avoid hitting the walls or your own tail</li>
            <li>Press Space or P to pause the game</li>
            <li>Try to beat your high score!</li>
          </ol>
        </div>
      )
    },
    memory: {
      title: 'Memory Match Instructions',
      content: (
        <div className="instructions-content">
          <ol>
            <li>Click on cards to flip them over</li>
            <li>Find matching pairs of cards</li>
            <li>Try to remember where cards are located</li>
            <li>Complete the game with as few moves as possible</li>
            <li>Choose difficulty: Easy (6 pairs), Medium (8 pairs), or Hard (12 pairs)</li>
          </ol>
        </div>
      )
    },
    reactiontest: {
      title: 'Reaction Test Instructions',
      content: (
        <div className="instructions-content">
          <ol>
            <li>Click "Start" to begin</li>
            <li>Wait for the screen to turn GREEN</li>
            <li>Click as fast as you can when you see green</li>
            <li>Don't click too early or you'll have to restart</li>
            <li>Try to beat your best reaction time!</li>
          </ol>
        </div>
      )
    },
    numberguesser: {
      title: 'Number Guesser Instructions',
      content: (
        <div className="instructions-content">
          <ol>
            <li>Select a difficulty level (Easy: 1-10, Medium: 1-50, Hard: 1-100)</li>
            <li>Enter your guess in the input field</li>
            <li>You'll get hints: "Too high" or "Too low"</li>
            <li>Keep guessing until you find the secret number</li>
            <li>Try to guess in as few attempts as possible!</li>
          </ol>
        </div>
      )
    },
    rockpaperscissors: {
      title: 'Rock Paper Scissors Instructions',
      content: (
        <div className="instructions-content">
          <ol>
            <li>Choose your weapon: Rock 🪨, Paper 📄, or Scissors ✂️</li>
            <li>Rock beats Scissors, Scissors beats Paper, Paper beats Rock</li>
            <li>First to reach a high score wins!</li>
            <li>View your game history at the bottom</li>
            <li>Click "Reset" to start a new game</li>
          </ol>
        </div>
      )
    },
    tictactoe: {
      title: 'Tic Tac Toe Instructions',
      content: (
        <div className="instructions-content">
          <ol>
            <li>Choose to play against Computer or another Player</li>
            <li>Player 1 is X, Player 2/Computer is O</li>
            <li>Take turns placing your mark on the 3x3 grid</li>
            <li>Get three in a row (horizontal, vertical, or diagonal) to win!</li>
            <li>If all squares are filled with no winner, it's a draw</li>
          </ol>
        </div>
      )
    }
  }

  const currentInstructions = instructions[gameId] || instructions.all

  const handleClose = () => {
    soundManager.playClick()
    onClose()
  }

  return (
    <div className="instructions-modal-overlay" onClick={handleClose}>
      <div className="instructions-modal" onClick={(e) => e.stopPropagation()}>
        <div className="instructions-header">
          <h2>{currentInstructions.title}</h2>
          <button onClick={handleClose} className="close-button" aria-label="Close">
            ×
          </button>
        </div>
        <div className="instructions-body">
          {currentInstructions.content}
        </div>
      </div>
    </div>
  )
}

export default InstructionsModal

