import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

const InputBox = forwardRef(({ onSend, disabled }, ref) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => textareaRef.current?.focus()
  }))

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
    }
  }, [message])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message)
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="
        sticky bottom-0
        p-4 
        bg-gradient-to-t from-gray-50 via-gray-50/95 to-gray-50/80
        dark:from-dark-bg dark:via-dark-bg/95 dark:to-dark-bg/80
        backdrop-blur-xl
      "
    >
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="
            relative
            flex items-end gap-2
            p-2 pl-4 rounded-2xl
            bg-white dark:bg-dark-card
            border border-gray-200 dark:border-dark-border
            shadow-lg shadow-gray-200/50 dark:shadow-black/20
            focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/20
            transition-all duration-300
          ">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Gemini..."
              disabled={disabled}
              rows={1}
              className="
                flex-1
                resize-none
                max-h-[200px]
                py-3
                bg-transparent
                text-gray-800 dark:text-gray-100
                placeholder:text-gray-400
                outline-none
                text-sm leading-relaxed
                disabled:opacity-50
              "
            />

            <motion.button
              type="submit"
              disabled={!message.trim() || disabled}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-2.5 rounded-xl
                transition-all duration-200
                ${message.trim() && !disabled
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-gray-100 dark:bg-dark-hover text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </form>

        <p className="text-center text-xs text-gray-400 mt-3">
          Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-500 font-mono">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-500 font-mono">Shift + Enter</kbd> for new line
        </p>
      </div>
    </motion.div>
  )
})

InputBox.displayName = 'InputBox'

export default InputBox
