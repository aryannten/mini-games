// Sound effects system using Web Audio API

class SoundManager {
  constructor() {
    this.enabled = false
    this.audioContext = null
    this.init()
  }

  init() {
    try {
      // Load preference from storage
      const settings = JSON.parse(localStorage.getItem('arcade_hub_settings') || '{}')
      this.enabled = settings.soundEnabled || false
    } catch {
      this.enabled = false
    }
  }

  enable() {
    this.enabled = true
    try {
      const settings = JSON.parse(localStorage.getItem('arcade_hub_settings') || '{}')
      settings.soundEnabled = true
      localStorage.setItem('arcade_hub_settings', JSON.stringify(settings))
    } catch {}
  }

  disable() {
    this.enabled = false
    try {
      const settings = JSON.parse(localStorage.getItem('arcade_hub_settings') || '{}')
      settings.soundEnabled = false
      localStorage.setItem('arcade_hub_settings', JSON.stringify(settings))
    } catch {}
  }

  getAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
    return this.audioContext
  }

  playTone(frequency, duration, type = 'sine', volume = 0.3) {
    if (!this.enabled) return

    try {
      const ctx = this.getAudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.value = frequency
      oscillator.type = type

      gainNode.gain.setValueAtTime(volume, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + duration)
    } catch (error) {
      console.warn('Sound playback failed:', error)
    }
  }

  // Predefined sound effects
  playClick() {
    this.playTone(800, 0.1, 'sine', 0.2)
  }

  playSuccess() {
    this.playTone(523, 0.15, 'sine', 0.3)
    setTimeout(() => this.playTone(659, 0.15, 'sine', 0.3), 100)
    setTimeout(() => this.playTone(784, 0.2, 'sine', 0.3), 200)
  }

  playError() {
    this.playTone(200, 0.3, 'sawtooth', 0.3)
  }

  playMatch() {
    this.playTone(440, 0.2, 'sine', 0.25)
    setTimeout(() => this.playTone(554, 0.2, 'sine', 0.25), 100)
  }

  playFlip() {
    this.playTone(600, 0.1, 'square', 0.15)
  }

  playWin() {
    // Victory fanfare
    this.playTone(523, 0.15, 'sine', 0.3)
    setTimeout(() => this.playTone(659, 0.15, 'sine', 0.3), 150)
    setTimeout(() => this.playTone(784, 0.15, 'sine', 0.3), 300)
    setTimeout(() => this.playTone(1047, 0.3, 'sine', 0.3), 450)
  }

  playMove() {
    this.playTone(400, 0.08, 'sine', 0.15)
  }
}

export const soundManager = new SoundManager()

