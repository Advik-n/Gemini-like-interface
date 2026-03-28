import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { User, Sparkles, Copy, Check, Clock } from 'lucide-react'

const Message = ({ message, isLast }) => {
  const [copied, setCopied] = useState(null)
  const isUser = message.role === 'user'

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const copyToClipboard = useCallback(async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [])

  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''
    const codeString = String(children).replace(/\n$/, '')
    const codeId = `code-${message.id}-${Math.random().toString(36).substr(2, 9)}`

    if (inline) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }

    return (
      <div className="relative group my-4">
        {/* Language badge */}
        {language && (
          <div className="absolute top-0 left-0 px-3 py-1 text-xs font-medium text-gray-400 bg-gray-800 rounded-tl-xl rounded-br-lg">
            {language}
          </div>
        )}
        
        {/* Copy button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => copyToClipboard(codeString, codeId)}
          className="
            absolute top-2 right-2
            p-2 rounded-lg
            bg-gray-700/50 hover:bg-gray-600
            opacity-0 group-hover:opacity-100
            transition-all duration-200
            text-gray-300 hover:text-white
          "
        >
          {copied === codeId ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </motion.button>

        <pre className={`${className} !mt-0 !rounded-xl overflow-x-auto`}>
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
      )}

      {/* Message Content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%] sm:max-w-[70%]`}>
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`
            message-bubble
            px-5 py-3.5 rounded-2xl
            ${isUser 
              ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-br-md' 
              : message.isError 
                ? 'bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400'
                : 'bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-bl-md shadow-sm'
            }
          `}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code: CodeBlock,
                  // Style links
                  a: ({ node, ...props }) => (
                    <a 
                      {...props} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 underline"
                    />
                  ),
                  // Style paragraphs
                  p: ({ node, ...props }) => (
                    <p {...props} className="my-2 leading-relaxed" />
                  ),
                  // Style lists
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="my-2 pl-6 list-disc" />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol {...props} className="my-2 pl-6 list-decimal" />
                  ),
                  li: ({ node, ...props }) => (
                    <li {...props} className="my-1" />
                  ),
                  // Style headings
                  h1: ({ node, ...props }) => (
                    <h1 {...props} className="text-xl font-bold mt-4 mb-2" />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 {...props} className="text-lg font-bold mt-3 mb-2" />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 {...props} className="text-base font-bold mt-3 mb-2" />
                  ),
                  // Style blockquotes
                  blockquote: ({ node, ...props }) => (
                    <blockquote {...props} className="border-l-4 border-purple-500 pl-4 my-3 italic text-gray-600 dark:text-gray-400" />
                  ),
                  // Style tables
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-4">
                      <table {...props} className="min-w-full border-collapse" />
                    </div>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </motion.div>

        {/* Timestamp */}
        <div className="flex items-center gap-1.5 mt-1.5 px-1">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-400">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center"
        >
          <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </motion.div>
      )}
    </motion.div>
  )
}

export default Message
