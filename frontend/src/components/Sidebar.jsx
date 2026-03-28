import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquarePlus, Trash2, MessageCircle, ChevronLeft, Search } from 'lucide-react'

const Sidebar = ({ 
  isOpen, 
  onToggle, 
  chats, 
  currentChat, 
  onSelectChat, 
  onDeleteChat, 
  onNewChat 
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredChat, setHoveredChat] = useState(null)

  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? 280 : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
          fixed lg:relative h-full z-30 lg:z-0
          bg-white/80 dark:bg-dark-surface/90 
          backdrop-blur-xl
          border-r border-gray-200/50 dark:border-dark-border/50
          flex flex-col overflow-hidden
          shadow-xl lg:shadow-none
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200/50 dark:border-dark-border/50">
          <div className="flex items-center justify-between mb-4">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-semibold text-lg gradient-text">Gemini</span>
            </motion.div>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors lg:hidden"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
              hover:from-blue-600 hover:via-purple-600 hover:to-pink-600
              text-white rounded-xl font-medium
              shadow-lg shadow-purple-500/20
              transition-all duration-300"
          >
            <MessageSquarePlus className="w-5 h-5" />
            <span>New Chat</span>
            <span className="ml-auto text-xs opacity-75 hidden sm:block">Ctrl+O</span>
          </motion.button>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 
                bg-gray-100 dark:bg-dark-card 
                border border-transparent
                focus:border-purple-500/50 focus:bg-white dark:focus:bg-dark-hover
                rounded-xl text-sm
                placeholder:text-gray-400
                transition-all duration-200
                outline-none"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          <AnimatePresence mode="popLayout">
            {filteredChats.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-400"
              >
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No chats yet</p>
                <p className="text-xs mt-1">Start a new conversation!</p>
              </motion.div>
            ) : (
              filteredChats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  transition={{ 
                    duration: 0.2, 
                    delay: index * 0.03,
                    layout: { duration: 0.2 }
                  }}
                  onMouseEnter={() => setHoveredChat(chat.id)}
                  onMouseLeave={() => setHoveredChat(null)}
                  onClick={() => onSelectChat(chat.id)}
                  className={`
                    relative group cursor-pointer
                    p-3 mb-2 rounded-xl
                    transition-all duration-200
                    ${currentChat === chat.id 
                      ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30' 
                      : 'hover:bg-gray-100 dark:hover:bg-dark-hover border border-transparent'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                      ${currentChat === chat.id 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
                        : 'bg-gray-100 dark:bg-dark-card text-gray-500'
                      }
                    `}>
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">
                        {chat.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatDate(chat.createdAt)}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <AnimatePresence>
                      {(hoveredChat === chat.id || currentChat === chat.id) && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            onDeleteChat(chat.id)
                          }}
                          className="p-1.5 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200/50 dark:border-dark-border/50">
          <div className="text-xs text-gray-400 text-center">
            <p>Powered by Gemini AI</p>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar
