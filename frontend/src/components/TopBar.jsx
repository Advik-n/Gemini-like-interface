import { motion } from 'framer-motion'
import { Moon, Sun, Menu, Plus, Sparkles } from 'lucide-react'

const TopBar = ({ darkMode, onToggleDarkMode, onToggleSidebar, onNewChat, sidebarOpen }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="
        sticky top-0 z-10
        h-16 px-4 
        flex items-center justify-between
        bg-white/70 dark:bg-dark-surface/70
        backdrop-blur-xl
        border-b border-gray-200/30 dark:border-dark-border/30
      "
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        {!sidebarOpen && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        )}

        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-dark-surface" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg gradient-text">Gemini AI</h1>
            <p className="text-xs text-gray-400 -mt-0.5">Intelligent Assistant</p>
          </div>
        </motion.div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNewChat}
          className="
            flex items-center gap-2 px-4 py-2
            bg-gray-100 dark:bg-dark-card
            hover:bg-gray-200 dark:hover:bg-dark-hover
            rounded-xl font-medium text-sm
            transition-colors duration-200
          "
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Chat</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleDarkMode}
          className="
            p-2.5
            bg-gray-100 dark:bg-dark-card
            hover:bg-gray-200 dark:hover:bg-dark-hover
            rounded-xl
            transition-colors duration-200
          "
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-500" />
          )}
        </motion.button>
      </div>
    </motion.header>
  )
}

export default TopBar
