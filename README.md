# Reflex Rush ⚡

A fast-paced reflex game built with React, Vite, and TailwindCSS. Test your reflexes by clicking on shapes before they disappear!

🎮 Live Demo: https://reflex-rush-game-ulmv.vercel.app/

## 🎮 Game Features

- **Authentication System**: Login/Signup required to play
- **Timed Gameplay**: Choose between 30-second or 1-minute game modes
- **Lives System**: Start with 3 lives, lose one when shapes expire
- **Scoring & Combos**: Earn points and build combos for higher scores
- **Leaderboard**: Track high scores with local storage
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Modern UI with violet/pink neon accents

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   \`\`\`bash
   git clone <https://github.com/Rakshita-04/Reflex-Rush-Game>
   cd reflex-rush-game
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The game will be running locally

### Build for Production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 🎯 How to Play

1. **Sign Up/Login**: Create an account or login to access the game
2. **Choose Game Mode**: Select 30-second or 1-minute timer
3. **Click Shapes**: Click on the colored shapes before they disappear
4. **Build Combos**: Hit consecutive shapes to build combo multipliers
5. **Survive**: Don't let shapes expire or you'll lose lives
6. **Beat Your Score**: Try to achieve the highest score possible

### Game Controls

- **Mouse Click**: Click on shapes to score points
- **Responsive Touch**: Touch shapes on mobile devices

### Scoring System

- **Base Points**: 10 points per shape
- **Combo Multiplier**: 2x, 3x, 4x, 5x for consecutive hits
- **Bonus**: Higher combos = higher scores

## 📁 Project Structure

\`\`\`
reflex-rush/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Game.jsx
│   │   ├── LeaderboardPage.jsx
│   │   ├── HowToPlayPage.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
\`\`\`

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Local Storage** - Data persistence

## 🔧 Troubleshooting

### Common Issues

1. **Dependencies not installing**
   \`\`\`bash
   # Delete node_modules and package-lock.json
   rm -rf node_modules package-lock.json  # Linux/Mac
   # OR
   Remove-Item -Recurse -Force node_modules  # Windows PowerShell
   
   # Reinstall
   npm install
   \`\`\`

2. **Port already in use**
   - Vite will automatically use the next available port
   - Or specify a different port: `npm run dev -- --port 3000`

3. **Game timer issues**
   - Check browser console (F12) for debug logs
   - Ensure JavaScript is enabled
   - Try refreshing the page

4. **Authentication not working**
   - Any email and password (6+ characters) will work
   - Check browser console for error messages
   - Clear browser storage if needed

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Customization

### Changing Game Settings

Edit `src/pages/Game.jsx` to modify:
- Timer durations
- Lives count
- Shape spawn rates
- Scoring system

### Styling

The project uses TailwindCSS. Modify styles in:
- `src/index.css` - Global styles
- Component files - Component-specific styles


## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🎯 Future Enhancements

- [ ] Online multiplayer mode
- [ ] Power-ups and special shapes
- [ ] Sound effects and music
- [ ] Different game modes
- [ ] User profiles and statistics
- [ ] Social features and sharing

---

**Enjoy playing Reflex Rush! ⚡**
