import { useState, useEffect, useRef, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import InputBox from './components/InputBox'
import TopBar from './components/TopBar'
import FloatingBackground from './components/FloatingBackground'
import { getChatHistory, saveChatHistory, getCurrentChatId, setCurrentChatId } from './utils/storage'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : true
  })
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [chats, setChats] = useState(() => getChatHistory())
  const [currentChat, setCurrentChat] = useState(() => getCurrentChatId())
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)

  // Initialize or load current chat
  useEffect(() => {
    if (!currentChat) {
      createNewChat()
    } else {
      const chat = chats.find(c => c.id === currentChat)
      if (chat) {
        setMessages(chat.messages || [])
      }
    }
  }, [])

  // Save chats to storage whenever they change
  useEffect(() => {
    saveChatHistory(chats)
  }, [chats])

  // Save current chat ID
  useEffect(() => {
    if (currentChat) {
      setCurrentChatId(currentChat)
    }
  }, [currentChat])

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'o') {
        e.preventDefault()
        createNewChat()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const createNewChat = useCallback(() => {
    const newChat = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString()
    }
    setChats(prev => [newChat, ...prev])
    setCurrentChat(newChat.id)
    setMessages([])
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  const switchChat = useCallback((chatId) => {
    const chat = chats.find(c => c.id === chatId)
    if (chat) {
      setCurrentChat(chatId)
      setMessages(chat.messages || [])
    }
  }, [chats])

  const deleteChat = useCallback((chatId) => {
    setChats(prev => prev.filter(c => c.id !== chatId))
    if (currentChat === chatId) {
      const remaining = chats.filter(c => c.id !== chatId)
      if (remaining.length > 0) {
        switchChat(remaining[0].id)
      } else {
        createNewChat()
      }
    }
  }, [chats, currentChat, switchChat, createNewChat])

  const sendMessage = async (content) => {
    if (!content.trim() || isLoading) return

    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsLoading(true)

    // Update chat title if it's the first message
    if (messages.length === 0) {
      const title = content.trim().slice(0, 30) + (content.length > 30 ? '...' : '')
      setChats(prev => prev.map(c => 
        c.id === currentChat ? { ...c, title, messages: updatedMessages } : c
      ))
    } else {
      setChats(prev => prev.map(c => 
        c.id === currentChat ? { ...c, messages: updatedMessages } : c
      ))
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, chatId: currentChat })
      })

      const data = await response.json()

      const aiMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString()
      }

      const finalMessages = [...updatedMessages, aiMessage]
      setMessages(finalMessages)
      setChats(prev => prev.map(c => 
        c.id === currentChat ? { ...c, messages: finalMessages } : c
      ))
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date().toISOString(),
        isError: true
      }
      const finalMessages = [...updatedMessages, errorMessage]
      setMessages(finalMessages)
      setChats(prev => prev.map(c => 
        c.id === currentChat ? { ...c, messages: finalMessages } : c
      ))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`h-screen w-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
      <div className="h-full w-full bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 flex relative">
        <FloatingBackground />
        
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          chats={chats}
          currentChat={currentChat}
          onSelectChat={switchChat}
          onDeleteChat={deleteChat}
          onNewChat={createNewChat}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <TopBar
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onNewChat={createNewChat}
            sidebarOpen={sidebarOpen}
          />

          <ChatWindow
            messages={messages}
            isLoading={isLoading}
          />

          <InputBox
            ref={inputRef}
            onSend={sendMessage}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default App
