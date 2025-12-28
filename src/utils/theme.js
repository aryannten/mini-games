// Theme management utility

export const themes = {
  dark: {
    name: 'dark',
    bg: '#0a0a0f',
    cardBg: 'rgba(20, 20, 30, 0.75)',
    text: 'white',
    textSecondary: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.06)',
    primary: '#9333ea',
    gradient: 'linear-gradient(135deg, #e879f9, #c084fc, #a855f7)'
  },
  light: {
    name: 'light',
    bg: '#f8fafc',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: 'rgba(0, 0, 0, 0.1)',
    primary: '#9333ea',
    gradient: 'linear-gradient(135deg, #9333ea, #7c3aed, #6d28d9)'
  }
}

export const themeManager = {
  getTheme: () => {
    try {
      const saved = localStorage.getItem('arcade_hub_theme')
      return saved === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  },

  setTheme: (theme) => {
    try {
      localStorage.setItem('arcade_hub_theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
      return true
    } catch {
      return false
    }
  },

  init: () => {
    const theme = themeManager.getTheme()
    themeManager.setTheme(theme)
  }
}

