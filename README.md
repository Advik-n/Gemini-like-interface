# Gemini AI Chat Interface

A modern, polished AI chat interface built with React and powered by Google's Gemini AI. Features a beautiful Gemini-inspired design with smooth animations, dark mode, and session-based chat history.

![Gemini Chat Interface](https://img.shields.io/badge/React-18.3-blue) ![Node.js](https://img.shields.io/badge/Node.js-20+-green) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan) ![Gemini AI](https://img.shields.io/badge/Gemini-AI-purple)

## ✨ Features

### UI/UX
- 🎨 **Modern Gemini-style design** - Clean, minimalist interface
- 🌗 **Dark/Light mode** - Toggle with beautiful transitions
- 📱 **Fully responsive** - Works on desktop and mobile
- ✨ **Smooth animations** - Powered by Framer Motion
- 🖼️ **Glassmorphism effects** - Subtle backdrop blur and transparency
- 🎯 **Floating background** - Animated floating lines effect

### Chat Features
- 💬 **Real-time AI responses** - Powered by Gemini 1.5 Flash
- 📝 **Markdown rendering** - Full markdown support with syntax highlighting
- 📋 **Code blocks** - Beautiful syntax highlighting with copy button
- 🕐 **Message timestamps** - Know when messages were sent
- 📜 **Chat history** - Session-based storage in browser

### Technical
- ⚡ **Fast** - Vite-powered frontend
- 🔒 **Session storage** - No login required, chats stored locally
- ⌨️ **Keyboard shortcuts** - `Ctrl+N` for new chat
- 🔄 **Auto-expanding input** - Textarea grows with content

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Advik-n/Gemini-like-interface.git
cd Gemini-like-interface
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Start the backend** (in one terminal)
```bash
cd backend
npm run dev
```

5. **Start the frontend** (in another terminal)
```bash
cd frontend
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:5173`

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx       # Chat history sidebar
│   │   │   ├── TopBar.jsx        # Top navigation bar
│   │   │   ├── ChatWindow.jsx    # Main chat area
│   │   │   ├── Message.jsx       # Message bubble component
│   │   │   ├── InputBox.jsx      # Chat input area
│   │   │   ├── Loader.jsx        # Loading animation
│   │   │   └── FloatingBackground.jsx
│   │   ├── hooks/
│   │   │   └── useStorage.js     # Storage hooks
│   │   ├── utils/
│   │   │   └── storage.js        # Session storage utilities
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   ├── controllers/
│   │   └── chatController.js     # Chat logic & Gemini integration
│   ├── routes/
│   │   └── chat.js               # API routes
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + N` | Start new chat |
| `Enter` | Send message |
| `Shift + Enter` | New line in message |

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Markdown** - Markdown rendering
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Google Generative AI** - Gemini API

## 🔧 Configuration

### Environment Variables

Create a `backend/.env` file with your API key:

```env
GEMINI_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
```

**Get your API key from:** https://aistudio.google.com/apikey

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message and get AI response |
| POST | `/api/new` | Create new chat session |
| GET | `/api/history` | Get chat history |
| GET | `/health` | Health check |

## 📸 Screenshots

The interface features:
- Clean, modern sidebar for chat navigation
- Professional message bubbles with markdown support
- Beautiful loading animations
- Syntax-highlighted code blocks
- Responsive design for all screen sizes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) - AI model
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
