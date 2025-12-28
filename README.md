# 🎮 Arcade Hub - Mini Game Collection

A modern, interactive web-based gaming platform featuring 8 exciting mini-games built with React and Vite. Experience a beautiful cyan/teal themed interface with advanced features including statistics tracking, achievements, sound effects, and more!

## 🌟 Live Demo

**[🚀 Play Now](https://aryannten.github.io/mini-proj/)**

## 📋 About This Project

This is a **comprehensive gaming hub** that showcases modern web development using React, featuring 8 diverse games, advanced UI/UX features, and a complete gaming experience with statistics, achievements, and customizable settings.

## 🎯 Key Features

### 🎮 Gaming Features
- **8 Diverse Games**: From classic puzzles to action-packed racing
- **Statistics Dashboard**: Track your performance across all games
- **Achievement System**: Unlock badges and milestones
- **High Score Tracking**: Persistent local storage for best scores
- **Game Instructions**: Built-in help and tutorials for each game

### 🎨 UI/UX Features
- **Modern Cyan/Teal Theme**: Beautiful color palette with smooth gradients
- **Light/Dark Mode Toggle**: Switch between themes instantly
- **Sound Effects**: Optional audio feedback for game actions
- **Search & Filter**: Find games quickly by name or difficulty
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Polished transitions and interactions
- **Glassmorphism Effects**: Modern transparent card designs

### 🔧 Technical Features
- **PWA Ready**: Installable as a web app
- **Local Storage**: Persistent game statistics and settings
- **Performance Optimized**: Smooth 60fps gameplay
- **Accessibility**: Keyboard navigation and screen reader support

## 🎲 Available Games

### 🧠 Memory Match (Medium)
Test your memory by matching pairs of cards. Features multiple difficulty levels, move counter, and timer tracking.

### ⚡ Reaction Test (Easy)
Measure your reflexes! Click as fast as you can when the screen turns green. Tracks your best reaction time.

### 🏆 Number Guesser (Easy)
Guess the secret number with helpful hints. Choose from Easy (1-10), Medium (1-50), or Hard (1-100) difficulty levels.

### ✂️ Rock Paper Scissors (Easy)
Classic hand game against the computer. Track your win streak and game history.

### 🎮 Tic Tac Toe (Hard)
Play against AI or challenge a friend. Features score tracking across multiple rounds with "New Round" functionality.

### 🐍 Snake (Medium)
Classic snake game with growing mechanics. Eat food to grow and avoid walls. Includes pause functionality and high score tracking.

### 🏎️ Infinite Racing (Hard)
Endless racing game! Avoid obstacles, increase speed, and survive as long as possible. Speed increases every 100 points.

### 🐦 Flappy Bird (Hard)
Navigate through pipes by tapping to fly. Classic gameplay with score tracking and high score persistence.

### 🎯 Breakout (Medium)
Break all the bricks using your paddle. Features 3 lives, score tracking, and win conditions.

## 🛠️ Technologies Used

### **React 19 - Frontend Framework**
- **Component Architecture**: 8 game components + reusable UI components
- **React Hooks**: `useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`
- **State Management**: Local state with localStorage persistence
- **Performance**: Optimized re-renders with refs and callbacks

### **JavaScript ES6+**
- **Modern Syntax**: Arrow functions, destructuring, template literals
- **Game Logic**: Complex algorithms for AI, collision detection, physics
- **Async Operations**: Timers, intervals, event handling

### **CSS3 - Advanced Styling**
- **CSS Variables**: Dynamic theming with custom properties
- **CSS Grid & Flexbox**: Responsive layouts
- **Animations**: Keyframe animations, transitions, transforms
- **Glassmorphism**: Backdrop filters and transparency effects
- **Responsive Design**: Mobile-first approach with media queries

### **Vite - Build Tool**
- **Fast HMR**: Instant development updates
- **Optimized Builds**: Production-ready bundles
- **Modern ES Modules**: Native ESM support

### **PWA Features**
- **Web App Manifest**: Installable application
- **Service Worker Ready**: Offline capability support
- **Meta Tags**: SEO and social sharing optimization

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/aryannten/mini-proj.git
cd mini-proj
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## 🌐 Deployment

### Deploy to GitHub Pages

1. **Install dependencies:**
```bash
npm install
```

2. **Deploy:**
```bash
npm run deploy
```

3. **Access your site:**
Your site will be available at: `https://yourusername.github.io/mini-proj/`

### Alternative Deployment Options

- **Netlify**: Drag and drop the `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel**: Connect your GitHub repo at [vercel.com](https://vercel.com) for auto-deployment
- **Any Static Host**: Upload the `dist` folder contents

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── GameCard.jsx        # Game selection cards
│   ├── GameCard.css        # Card styling
│   ├── InstructionsModal.jsx # Game instructions modal
│   └── InstructionsModal.css
├── games/                  # Individual game components
│   ├── MemoryGame.jsx      # Memory matching game
│   ├── TicTacToe.jsx       # Tic tac toe with AI
│   ├── NumberGuesser.jsx   # Number guessing game
│   ├── RockPaperScissors.jsx
│   ├── ReactionTest.jsx    # Reaction time test
│   ├── Snake.jsx           # Classic snake game
│   ├── InfiniteRacing.jsx  # Endless racing game
│   ├── FlappyBird.jsx      # Flappy bird clone
│   └── Breakout.jsx         # Breakout game
├── utils/                  # Utility functions
│   ├── storage.js          # LocalStorage management
│   ├── theme.js            # Theme management
│   ├── sounds.js           # Sound effects system
│   ├── achievements.js     # Achievement system
│   ├── leaderboard.js      # Leaderboard management
│   └── share.js            # Social sharing utilities
├── App.jsx                 # Main application component
├── App.css                 # Global application styles
├── main.jsx                # Application entry point
└── index.css               # Base styles and theme variables
```

## 🎨 Design Features

### Color Palette
- **Primary Color**: Cyan (#06b6d4)
- **Accent Color**: Teal (#0891b2)
- **Dark Theme**: Deep blue background (#0a1628)
- **Light Theme**: Light blue background (#f0f9ff)
- **Gradients**: Smooth cyan-to-teal gradients

### UI Elements
- **Glassmorphism**: Transparent cards with backdrop blur
- **Smooth Animations**: Fade-ins, slide-ins, hover effects
- **Responsive Grid**: Auto-adjusting game card layouts
- **Interactive Buttons**: Hover states with scale and glow effects
- **Modern Typography**: Clean, readable fonts with proper hierarchy

## 🎮 Game Features

### Statistics & Tracking
- **Persistent Stats**: All game statistics saved locally
- **High Scores**: Best scores tracked per game
- **Game History**: Track games played, wins, and performance
- **Statistics Dashboard**: Visual overview of all achievements

### Achievements System
- **8 Unique Achievements**: Unlock badges for various milestones
- **Achievement Notifications**: Pop-up notifications when unlocked
- **Achievement Gallery**: View all achievements and progress

### Sound System
- **Optional Sound Effects**: Toggle on/off in header
- **Game Actions**: Click, success, error, match, win sounds
- **Web Audio API**: Pure JavaScript sound generation

### Game Instructions
- **Built-in Help**: Click "Help" button for game instructions
- **Game-specific Guides**: Detailed instructions for each game
- **Modal Interface**: Beautiful modal with game rules

## 🎓 Learning Objectives

This project demonstrates:
- ✅ **Component-based Architecture**: Modular React components
- ✅ **State Management**: Complex state with hooks and refs
- ✅ **Game Development**: Physics, collision detection, game loops
- ✅ **UI/UX Design**: Modern design patterns and animations
- ✅ **Performance Optimization**: Refs, callbacks, memoization
- ✅ **Local Storage**: Persistent data management
- ✅ **PWA Concepts**: Web app manifest and installability
- ✅ **Responsive Design**: Mobile-first development
- ✅ **Accessibility**: Keyboard navigation and ARIA labels

## 🎯 Game Controls

### Memory Match
- Click cards to flip and match pairs
- Choose difficulty: Easy (6 pairs), Medium (8 pairs), Hard (12 pairs)
- Timer tracks completion time

### Reaction Test
- Click "Start Test" or click anywhere to begin
- Wait for green screen, then click immediately
- View your best reaction time

### Number Guesser
- Enter your guess and press Enter
- Get hints: "Too high" or "Too low"
- Choose difficulty level before starting

### Rock Paper Scissors
- Click your choice: Rock, Paper, or Scissors
- View score and game history
- Reset to start new game

### Tic Tac Toe
- Click cells to place X or O
- Play vs Computer or vs Player
- "New Round" button keeps score, "Reset Score" clears everything

### Snake
- Arrow keys or on-screen buttons to control
- Space or P to pause
- Eat food to grow and increase score

### Infinite Racing
- Arrow keys (← →) or A/D to move between lanes
- Space or P to pause
- Avoid obstacles, speed increases every 100 points

### Flappy Bird
- Space, ↑, or W to fly up
- Click anywhere on screen to fly
- Navigate through pipe gaps

### Breakout
- Move mouse to control paddle
- Click to start ball
- Break all bricks to win (3 lives)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Code Style
- ESLint configuration for code quality
- Consistent component structure
- Reusable utility functions
- Clean separation of concerns

## 🤝 Contributing

Contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Arcade Hub** - A comprehensive mini-game collection showcasing modern web development.

Developed with:
- Modern React development with hooks and component architecture
- Advanced CSS styling with glassmorphism and responsive design
- Interactive game development with physics and collision detection
- Professional deployment workflows and version control
- User experience design for web applications

## 🌐 Live Access

The live version is hosted on GitHub Pages:
- **Direct Link**: https://aryannten.github.io/mini-proj/
- **Repository**: https://github.com/aryannten/mini-proj
- **No Installation Required**: Play instantly in any modern browser

## 🎉 Recent Updates

### Version 2.0 - Major Enhancements
- ✨ Added 4 new games (Snake, Infinite Racing, Flappy Bird, Breakout)
- 🎨 Complete UI redesign with cyan/teal color palette
- 🌓 Light/Dark theme toggle
- 🔊 Sound effects system
- 🏅 Achievement system with 8 unique badges
- 📊 Comprehensive statistics dashboard
- 🔍 Search and filter functionality
- 📱 Improved mobile responsiveness
- ⏱️ Game timers and speed challenges
- 📖 Built-in game instructions
- 🎯 Enhanced game mechanics and fixes

---

**🎮 Enjoy Gaming!** - Have fun playing all the games and unlocking achievements!
