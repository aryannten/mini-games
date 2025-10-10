import React, { useState, useEffect, useRef } from 'react'
import './ReactionTest.css'

export default function ReactionTest({ onBack }) {
  const [phase, setPhase] = useState('start') // start, wait, go, result
  const [startTime, setStartTime] = useState(null)
  const [reaction, setReaction] = useState(null)
  const [best, setBest] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const begin = () => {
    setReaction(null)
    setPhase('wait')
    const delay = 800 + Math.floor(Math.random() * 2000)
    timeoutRef.current = setTimeout(() => {
      setPhase('go')
      const now = performance.now()
      setStartTime(now)
    }, delay)
  }

  const handleClick = () => {
    if (phase === 'wait') {
      // clicked too early
      clearTimeout(timeoutRef.current)
      setPhase('start')
      setReaction('Too soon!')
      return
    }

    if (phase === 'go') {
      const now = performance.now()
      const rt = Math.round(now - startTime)
      setReaction(rt)
      setPhase('result')
      if (best === null || rt < best) setBest(rt)
    }
  }

  const reset = () => {
    setPhase('start')
    setReaction(null)
  }

  return (
    <div className="reaction-wrap">
      <header className="game-header">
        <h2>Reaction Test</h2>
        <button className="back-button" onClick={onBack}>← Back</button>
      </header>

      <div className="reaction-area">
        <div
          role="button"
          tabIndex={0}
          className={`reaction-box ${phase}`}
          onClick={handleClick}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
          {phase === 'start' && <div className="msg">Click to start</div>}
          {phase === 'wait' && <div className="msg">Wait for green...</div>}
          {phase === 'go' && <div className="msg">Click!</div>}
          {phase === 'result' && (
            <div className="msg">{reaction === 'Too soon!' ? reaction : `${reaction} ms`}</div>
          )}
        </div>

        <div className="reaction-controls">
          <button onClick={begin} className="primary">Start</button>
          <button onClick={reset}>Reset</button>
          <div className="stats">
            <div>Last: {reaction ? (reaction === 'Too soon!' ? reaction : `${reaction} ms`) : '-'}</div>
            <div>Best: {best ? `${best} ms` : '-'}</div>
          </div>
        </div>
      </div>

    </div>
  )
}
