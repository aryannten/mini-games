// Achievements system

export const achievements = {
  firstGame: {
    id: 'firstGame',
    name: 'First Steps',
    description: 'Play your first game',
    icon: '🎮',
    condition: (stats) => stats.totalGamesPlayed >= 1
  },
  memoryMaster: {
    id: 'memoryMaster',
    name: 'Memory Master',
    description: 'Win Memory Match in under 20 moves',
    icon: '🧠',
    condition: (stats) => stats.memory?.bestScore && stats.memory.bestScore <= 20
  },
  reactionPro: {
    id: 'reactionPro',
    name: 'Lightning Reflexes',
    description: 'Achieve reaction time under 200ms',
    icon: '⚡',
    condition: (stats) => stats.reactiontest?.bestReaction && stats.reactiontest.bestReaction < 200
  },
  numberWizard: {
    id: 'numberWizard',
    name: 'Number Wizard',
    description: 'Guess the number in 3 attempts or less',
    icon: '🏆',
    condition: (stats) => stats.numberguesser?.minAttempts && stats.numberguesser.minAttempts <= 3
  },
  snakeChampion: {
    id: 'snakeChampion',
    name: 'Snake Champion',
    description: 'Reach a score of 50 in Snake',
    icon: '🐍',
    condition: (stats) => stats.snake?.bestScore && stats.snake.bestScore >= 50
  },
  ticTacToeMaster: {
    id: 'ticTacToeMaster',
    name: 'Tic Tac Toe Master',
    description: 'Win 10 games of Tic Tac Toe',
    icon: '🎮',
    condition: (stats) => stats.tictactoe?.gamesWon && stats.tictactoe.gamesWon >= 10
  },
  arcadeAddict: {
    id: 'arcadeAddict',
    name: 'Arcade Addict',
    description: 'Play 50 games total',
    icon: '🎯',
    condition: (stats) => stats.totalGamesPlayed >= 50
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Win all game types at least once',
    icon: '⭐',
    condition: (stats) => {
      const games = ['memory', 'reactiontest', 'numberguesser', 'rockpaperscissors', 'tictactoe', 'snake']
      return games.every(gameId => stats[gameId]?.gamesWon > 0)
    }
  }
}

export const achievementManager = {
  getUnlocked: () => {
    try {
      const unlocked = localStorage.getItem('arcade_hub_achievements')
      return unlocked ? JSON.parse(unlocked) : []
    } catch {
      return []
    }
  },

  unlock: (achievementId) => {
    try {
      const unlocked = achievementManager.getUnlocked()
      if (!unlocked.includes(achievementId)) {
        unlocked.push(achievementId)
        localStorage.setItem('arcade_hub_achievements', JSON.stringify(unlocked))
        return true
      }
      return false
    } catch {
      return false
    }
  },

  checkAchievements: (allStats) => {
    const unlocked = achievementManager.getUnlocked()
    const totalGamesPlayed = Object.values(allStats).reduce((sum, stat) => sum + (stat.gamesPlayed || 0), 0)
    
    const statsWithTotal = {
      ...allStats,
      totalGamesPlayed
    }

    const newlyUnlocked = []
    
    Object.values(achievements).forEach(achievement => {
      if (!unlocked.includes(achievement.id) && achievement.condition(statsWithTotal)) {
        if (achievementManager.unlock(achievement.id)) {
          newlyUnlocked.push(achievement)
        }
      }
    })

    return newlyUnlocked
  },

  getAllAchievements: () => {
    const unlocked = achievementManager.getUnlocked()
    return Object.values(achievements).map(achievement => ({
      ...achievement,
      unlocked: unlocked.includes(achievement.id)
    }))
  }
}

