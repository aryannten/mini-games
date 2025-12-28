// Local leaderboard system

const LEADERBOARD_KEY = 'arcade_hub_leaderboard'

export const leaderboardManager = {
  addScore: (gameId, playerName, score, metadata = {}) => {
    try {
      const leaderboards = leaderboardManager.getAll()
      if (!leaderboards[gameId]) {
        leaderboards[gameId] = []
      }

      const entry = {
        playerName: playerName || 'Anonymous',
        score,
        date: new Date().toISOString(),
        ...metadata
      }

      leaderboards[gameId].push(entry)
      // Keep top 10 scores
      leaderboards[gameId].sort((a, b) => {
        // Higher score is better for most games
        // For reaction time, lower is better
        if (gameId === 'reactiontest') {
          return a.score - b.score
        }
        return b.score - a.score
      })
      leaderboards[gameId] = leaderboards[gameId].slice(0, 10)

      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboards))
      return true
    } catch (error) {
      console.error('Error adding to leaderboard:', error)
      return false
    }
  },

  getAll: () => {
    try {
      const data = localStorage.getItem(LEADERBOARD_KEY)
      return data ? JSON.parse(data) : {}
    } catch {
      return {}
    }
  },

  getGameLeaderboard: (gameId) => {
    const all = leaderboardManager.getAll()
    return all[gameId] || []
  },

  clearLeaderboard: (gameId) => {
    try {
      const leaderboards = leaderboardManager.getAll()
      if (gameId) {
        delete leaderboards[gameId]
      } else {
        // Clear all
        Object.keys(leaderboards).forEach(key => delete leaderboards[key])
      }
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboards))
      return true
    } catch {
      return false
    }
  }
}

