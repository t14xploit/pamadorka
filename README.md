# 🧠 Pamadorka - Neural Focus Interface

A cyberpunk-themed Pomodoro timer application designed for enhanced productivity, focus, and mental well-being. Immerse yourself in a futuristic study environment with background music, brain-training games, and comprehensive progress tracking.
- **Live Demo**: Visit [pamadorka.netlify.app](https://pamadorka.netlify.app/) to see the project in action.


## ✨ Features

### 🎯 **Focus & Productivity**
- **Advanced Pomodoro Timer**: 25-minute work sessions with 5-minute short breaks and 15-minute long breaks
- **Background Execution**: Timer continues running even when switching browser tabs or applications
- **Smart Session Management**: Automatic progression through work → short break → work → long break cycles
- **Real-time Statistics**: Track actual focus time, not just completed sessions

### 🎮 **Brain Training & Relaxation**
- **Single-Player Tic-Tac-Toe**: Challenge an intelligent AI opponent during breaks
- **Background Music**: Curated selection for enhanced concentration
- **Neural Interface Design**: Cyberpunk aesthetic to keep you engaged

### 📊 **Progress Tracking**
- **Comprehensive Statistics**: Total sessions, focus time, streaks, and daily progress
- **Weekly Progress Matrix**: Visual representation of your productivity patterns
- **Streak Tracking**: Maintain motivation with daily focus streaks
- **Persistent Data**: All progress saved locally in your browser

### 📱 **Responsive Design**
- **Desktop Experience**: Full-featured dock navigation with hover effects
- **Mobile Optimized**: Collapsible menu system that doesn't interfere with content
- **Cross-Platform**: Works seamlessly on all devices and browsers

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pamadorka
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🎨 Design Philosophy

### **Cyberpunk Aesthetic**
- **Color Palette**: Neon cyan, purple, and pink accents on dark backgrounds
- **Typography**: Monospace fonts for that terminal/code feel
- **Effects**: Glowing borders, animated gradients, and subtle animations
- **UI Elements**: Futuristic buttons, neural-themed labels, and holographic effects

### **User Experience**
- **Intuitive Navigation**: Clear visual hierarchy and familiar interaction patterns
- **Accessibility**: High contrast colors and readable typography
- **Performance**: Optimized animations and efficient state management
- **Responsiveness**: Seamless experience across all device sizes

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 15.3.4**: React framework with App Router for optimal performance
- **React 19**: Latest React features with concurrent rendering
- **TypeScript**: Type-safe development for better code quality

### **Styling & UI**
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Beautiful, customizable icons
- **CSS Animations**: Custom keyframes and transitions for smooth interactions

### **State Management**
- **React Hooks**: useState, useEffect, useRef for local state management
- **localStorage**: Persistent data storage for statistics and timer state
- **Custom Hooks**: Reusable logic for timer management and statistics

### **Development Tools**
- **ESLint**: Code linting with Next.js recommended rules
- **TypeScript**: Static type checking
- **Turbopack**: Fast development builds (development mode)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main application component
├── components/
│   ├── pomodoro-timer.tsx   # Timer component with controls
│   ├── pomodoro-dock.tsx    # Navigation dock (desktop + mobile)
│   ├── statistics-dashboard.tsx  # Progress tracking and analytics
│   ├── tic-tac-toe.tsx      # Single-player game component
│   └── music-player.tsx     # Background music interface
└── types/
    └── statistics.ts        # TypeScript type definitions
```

## 🎯 Usage Guide

### **Starting a Focus Session**
1. Click the "Neural Study" mode in the dock
2. Press the play button to start your 25-minute focus session
3. The timer will continue running even if you switch tabs
4. Take breaks when prompted and track your progress

### **Viewing Statistics**
1. Navigate to "Neural Analytics" in the dock
2. View your daily, weekly, and overall progress
3. Monitor your focus streaks and total time invested
4. Use insights to optimize your productivity patterns

### **Taking Breaks**
1. Play Tic-Tac-Toe against the AI during short breaks
2. Listen to background music to maintain focus
3. Let the timer automatically guide you back to work

### **Mobile Usage**
1. Tap the menu icon (top-left) to access navigation
2. Select your desired mode from the overlay menu
3. The interface adapts to your screen size automatically

## 🔧 Configuration

### **Timer Settings**
- Work sessions: 25 minutes
- Short breaks: 5 minutes
- Long breaks: 15 minutes
- Long break frequency: Every 4 work sessions

### **Statistics Tracking**
- Minimum daily focus time for streaks: 5 minutes
- Data retention: 30 days of detailed history
- Real-time updates: Statistics update immediately when timer stops

## 🚀 Deployment

### **Netlify (Recommended)**
1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Deploy automatically on git push

### **Vercel**
1. Import project to Vercel
2. Deploy with zero configuration
3. Automatic deployments on git push

### **Self-Hosting**
1. Run `npm run build`
2. Serve the `.next` folder with any static hosting service
3. Ensure proper routing for single-page application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js Team**: For the incredible React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon library
- **Pomodoro Technique**: Created by Francesco Cirillo
- **Coffee Breaks**: Proud sponsor of 90% of this code and 100% of the bugs.

---

**Built for productivity enthusiasts and cyberpunk lovers**
