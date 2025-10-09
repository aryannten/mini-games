# 🎮 Arcade Hub - Mini Game Collection

A modern, interactive web-based gaming platform featuring classic mini-games built with React and Vite. This project was developed as a college miniproject to demonstrate front-end development skills and interactive web application design.

## 🌟 Live Demo

**[🚀 Play Now -](https://aryannten.github.io/mini-proj/)**


## 📋 About This Project

This is a **college miniproject** that showcases the development of a comprehensive gaming hub using modern web technologies. The project demonstrates proficiency in React development, component architecture, state management, and responsive design principles.

## 🎯 Features

- **Four Classic Games**: Memory Match, Rock Paper Scissors, Number Guesser, and Tic Tac Toe
- **Modern UI/UX**: Dark theme with glassmorphism effects and smooth animations
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Interactive Gameplay**: Engaging user interactions and game mechanics
- **Tic Tac Toe Modes**: Play against computer AI or with another player
- **Single Page Application**: Seamless navigation between games

## 🎲 Available Games

### 🧠 Memory Match (Medium)
Test your memory by matching pairs of cards in this classic concentration game.

### ✂️ Rock Paper Scissors (Easy)
Classic hand game - beat the computer in this timeless strategy game.

### 🏆 Number Guesser (Easy)
Guess the secret number between 1 and 100 with helpful hints.

### 🎮 Tic Tac Toe (Hard)
Classic X and O strategy game with computer AI and multiplayer modes.

## 🛠️ Technologies Used & Implementation Details

### **React 18 - Frontend Framework**
**Implementation in Project:**
- **Component Architecture**: Built 4 separate game components (MemoryGame.jsx, TicTacToe.jsx, etc.) and reusable GameCard component
- **Functional Components**: Used modern function-based components with JSX syntax for all UI elements
- **React Hooks**: 
  - `useState` for managing game states (board positions, scores, current player, game status)
  - `useEffect` for handling side effects like computer AI moves and game timers
- **Props & State Flow**: Parent-child data communication between App.jsx and individual game components
- **Conditional Rendering**: Dynamic UI updates based on game states (showing winners, switching turns, etc.)

### **JavaScript ES6+ - Core Programming Language**
**Implementation in Project:**
- **Arrow Functions**: Used throughout components for cleaner syntax (`const handleClick = () => {}`)
- **Destructuring**: Extracted state values and props efficiently (`const { board, currentPlayer } = gameState`)
- **Array Methods**: Implemented game logic using map(), filter(), find() for board manipulation
- **Spread Operator**: State updates without mutation (`setBoard([...newBoard])`)
- **Template Literals**: Dynamic string generation for game messages and UI text
- **Modules**: Organized code with import/export statements between components

### **CSS3 - Advanced Styling & Design**
**Implementation in Project:**
- **CSS Grid**: Game board layouts (3x3 grid for Tic Tac Toe, card layouts for Memory Game)
- **Flexbox**: Card arrangements, button layouts, and responsive design
- **CSS Custom Properties**: Consistent color scheme with variables (--primary-color, --bg-color)
- **Backdrop Filter**: Glassmorphism effects on game cards with blur(20px) and transparency
- **CSS Transitions**: Smooth hover effects and game piece animations
- **Media Queries**: Responsive breakpoints for mobile, tablet, and desktop layouts
- **Pseudo-classes**: Interactive states (:hover, :active, :focus) for better UX

### **Vite - Build Tool & Development Server**
**Implementation in Project:**
- **Hot Module Replacement**: Instant updates during development without losing game state
- **Fast Build Process**: Optimized bundling for production deployment
- **Asset Optimization**: Automatic CSS and JavaScript minification
- **Development Server**: Local testing environment with live reload
- **GitHub Pages Configuration**: Custom base path setup for deployment

### **HTML5 - Semantic Structure**
**Implementation in Project:**
- **Semantic Elements**: Used `<main>`, `<section>`, `<header>` for proper document structure
- **Accessibility**: ARIA labels and proper heading hierarchy for screen readers
- **Form Elements**: Input validation in Number Guesser game with proper input types
- **Meta Tags**: Viewport configuration for mobile responsiveness

### **Git & GitHub - Version Control & Deployment**
**Implementation in Project:**
- **Repository Management**: Organized commit history with descriptive commit messages
- **GitHub Pages**: Automated deployment pipeline using gh-pages package
- **Branch Management**: Main branch for production-ready code
- **Continuous Deployment**: Automatic updates to live site when changes are pushed

### **Node.js & npm - Package Management**
**Implementation in Project:**
- **Dependency Management**: React, Vite, ESLint packages managed through package.json
- **Build Scripts**: Custom npm scripts for development, building, and deployment
- **Development Dependencies**: ESLint for code quality, gh-pages for deployment
- **Package Versions**: Specific version management for consistent builds across environments

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mini-proj.git
cd mini-proj
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🌐 Deployment

This project is configured for easy deployment to GitHub Pages.

### Deploy to GitHub Pages

1. **Install dependencies**:
```bash
npm install
```

2. **Deploy to GitHub Pages**:
```bash
npm run deploy
```

3. **GitHub Pages Auto-Setup**:
   - GitHub automatically creates and configures the `gh-pages` branch
   - No manual repository settings needed
   - Site becomes available at: `https://yourusername.github.io/mini-proj/`
   - Deployment typically takes 2-5 minutes to propagate

### Troubleshooting Deployment

If you encounter issues:

- **White Screen**: Wait 2-3 minutes after deployment, then hard refresh (Ctrl+F5)
- **404 Error**: Check that GitHub Pages is enabled in repository Settings > Pages
- **Build Fails**: Run `npm run build` locally first to check for errors
- **Assets Not Loading**: Clear browser cache or try incognito mode

### Alternative Deployment Options

- **Netlify**: Drag and drop the `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel**: Connect your GitHub repo at [vercel.com](https://vercel.com) for auto-deployment

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── GameCard.jsx    # Game selection cards
│   └── GameCard.css    # Card styling
├── games/              # Individual game components
│   ├── MemoryGame.jsx  # Memory matching game
│   ├── TicTacToe.jsx   # Tic tac toe with AI
│   ├── NumberGuesser.jsx # Number guessing game
│   └── RockPaperScissors.jsx # Rock paper scissors
├── App.jsx             # Main application component
├── App.css             # Global styling
└── main.jsx            # Application entry point
```

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme with purple accents
- **Glassmorphism**: Transparent cards with backdrop blur effects
- **Responsive Layout**: Adapts to different screen sizes
- **Hover Effects**: Interactive animations and transitions
- **Accessibility**: Proper contrast ratios and readable typography

## 🎓 Academic Context

This project serves as a practical demonstration of:
- **Component-based architecture** in React
- **State management** and lifecycle methods with hooks
- **CSS advanced techniques** including glassmorphism and animations
- **Responsive web design** principles for cross-device compatibility
- **User interface and user experience** design principles
- **Game logic implementation** and algorithms (AI for Tic Tac Toe)
- **Modern deployment** workflows with GitHub Pages
- **Version control** and collaborative development with Git

### Learning Objectives Achieved:
✅ Single Page Application (SPA) development  
✅ Interactive user interfaces with React  
✅ Modern CSS styling and animations  
✅ Responsive design for multiple devices  
✅ State management in complex applications  
✅ Algorithm implementation (game logic, AI)  
✅ Professional deployment and hosting  
✅ Clean, maintainable code architecture  

## 🤝 Contributing

This is a college project, but suggestions and improvements are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍🎓 Author

**College Miniproject** - Developed to demonstrate comprehensive web development skills including:
- Modern React development with hooks and component architecture
- Advanced CSS styling with glassmorphism and responsive design  
- Interactive game development and algorithm implementation
- Professional deployment workflows and version control
- User experience design for web applications

## 🌐 Live Access

The live version is hosted on GitHub Pages and accessible worldwide:
- **Direct Link**: https://aryannten.github.io/mini-proj/
- **Repository**: https://github.com/aryannten/mini-proj
- **No Installation Required**: Play instantly in any modern browser

---

**📚 Educational Project**: This miniproject showcases practical web development skills for academic evaluation and demonstrates proficiency in modern technologies and deployment practices.
