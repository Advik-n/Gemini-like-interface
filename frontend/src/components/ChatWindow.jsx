import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Message from './Message'
import Loader from './Loader'
import { Sparkles } from 'lucide-react'

const ChatWindow = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 relative"
    >
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full flex flex-col items-center justify-center py-20"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-2xl shadow-purple-500/30"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold gradient-text mb-2">
                Hello, how can I help?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                I'm Gemini, your AI assistant. Ask me anything and I'll do my best to help you.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {[
                  { title: 'Write code', desc: 'Help me write a Python function' },
                  { title: 'Explain concepts', desc: 'What is machine learning?' },
                  { title: 'Creative writing', desc: 'Write a short story' },
                  { title: 'Problem solving', desc: 'Debug my code' }
                ].map((suggestion, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="
                      p-4 rounded-2xl cursor-pointer
                      bg-white/50 dark:bg-dark-card/50
                      border border-gray-200/50 dark:border-dark-border/50
                      hover:border-purple-500/50 hover:bg-white dark:hover:bg-dark-card
                      transition-all duration-300
                      group
                    "
                  >
                    <h3 className="font-medium text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {suggestion.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{suggestion.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <Message
                key={message.id}
                message={message}
                isLast={index === messages.length - 1}
              />
            ))
          )}
        </AnimatePresence>

        {/* Loading indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default ChatWindow
