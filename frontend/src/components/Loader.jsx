import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const Loader = () => {
  return (
    <div className="flex gap-4 mb-6">
      {/* AI Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>

      {/* Loading bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
          px-5 py-4 rounded-2xl rounded-bl-md
          bg-white dark:bg-dark-card 
          border border-gray-100 dark:border-dark-border
          shadow-sm
          flex items-center gap-1.5
        "
      >
        {/* Animated typing dots */}
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              animate={{
                y: [0, -6, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        
        <span className="ml-2 text-sm text-gray-400">
          Thinking...
        </span>
      </motion.div>
    </div>
  )
}

export default Loader
