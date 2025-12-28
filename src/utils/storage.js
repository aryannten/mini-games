// Local storage utility for persisting game statistics and scores

const STORAGE_KEYS = {
  STATS: 'arcade_hub_stats',
  SETTINGS: 'arcade_hub_settings'
}

export const storage = {
  // Get all statistics
  getStats: () => {
    try {
      const stats = localStorage.getItem(STORAGE_KEYS.STATS)
      return stats ? JSON.parse(stats) : {}
    } catch (error) {
      console.error('Error reading stats from storage:', error)
      return {}
    }
  },

  // Update statistics for a specific game
  updateGameStats: (gameId, stats) => {
    try {
      const allStats = storage.getStats()
      const gameStats = allStats[gameId] || {
        gamesPlayed: 0,
        gamesWon: 0,
        bestScore: null,
        totalScore: 0,
        lastPlayed: null
      }

      // Update stats
      if (stats.gamesPlayed !== undefined) gameStats.gamesPlayed += stats.gamesPlayed
      if (stats.gamesWon !== undefined) gameStats.gamesWon += stats.gamesWon
      if (stats.score !== undefined) {
        gameStats.totalScore += stats.score
        if (gameStats.bestScore === null || stats.score > gameStats.bestScore) {
          gameStats.bestScore = stats.score
        }
      }
      if (stats.bestTime !== undefined) {
        if (gameStats.bestTime === null || stats.bestTime < gameStats.bestTime) {
          gameStats.bestTime = stats.bestTime
        }
      }
      if (stats.bestReaction !== undefined) {
        if (gameStats.bestReaction === null || stats.bestReaction < gameStats.bestReaction) {
          gameStats.bestReaction = stats.bestReaction
        }
      }
      if (stats.minAttempts !== undefined) {
        if (gameStats.minAttempts === null || stats.minAttempts < gameStats.minAttempts) {
          gameStats.minAttempts = stats.minAttempts
        }
      }

      gameStats.lastPlayed = new Date().toISOString()

      allStats[gameId] = gameStats
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(allStats))
      return gameStats
    } catch (error) {
      console.error('Error updating stats:', error)
      return null
    }
  },

  // Get stats for a specific game
  getGameStats: (gameId) => {
    const allStats = storage.getStats()
    return allStats[gameId] || {
      gamesPlayed: 0,
      gamesWon: 0,
      bestScore: null,
      totalScore: 0,
      bestTime: null,
      bestReaction: null,
      minAttempts: null,
      lastPlayed: null
    }
  },

  // Clear all statistics
  clearStats: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.STATS)
    } catch (error) {
      console.error('Error clearing stats:', error)
    }
  },

  // Get settings
  getSettings: () => {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS)
      return settings ? JSON.parse(settings) : { soundEnabled: false }
    } catch (error) {
      console.error('Error reading settings:', error)
      return { soundEnabled: false }
    }
  },

  // Save settings
  saveSettings: (settings) => {
    try {
      const currentSettings = storage.getSettings()
      const newSettings = { ...currentSettings, ...settings }
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings))
      return newSettings
    } catch (error) {
      console.error('Error saving settings:', error)
      return null
    }
  }
}

