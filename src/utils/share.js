// Social sharing utility

export const shareManager = {
  shareScore: async (gameName, score, additionalInfo = '') => {
    const text = `🎮 I just scored ${score} in ${gameName} on Arcade Hub! ${additionalInfo}\n\nPlay at: ${window.location.origin}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My ${gameName} Score`,
          text: text,
          url: window.location.origin
        })
        return true
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error)
        }
        return false
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(text)
        alert('Score copied to clipboard!')
        return true
      } catch (error) {
        console.error('Error copying to clipboard:', error)
        return false
      }
    }
  },

  shareAchievement: async (achievementName) => {
    const text = `🏅 I just unlocked the "${achievementName}" achievement on Arcade Hub!\n\nPlay at: ${window.location.origin}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Achievement Unlocked!',
          text: text,
          url: window.location.origin
        })
        return true
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error)
        }
        return false
      }
    } else {
      try {
        await navigator.clipboard.writeText(text)
        alert('Achievement copied to clipboard!')
        return true
      } catch (error) {
        console.error('Error copying to clipboard:', error)
        return false
      }
    }
  }
}

