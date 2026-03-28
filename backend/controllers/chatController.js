import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAyjaxJ4FDPDdHmLzZvQgkz-TYecVdVXQ4'
const genAI = new GoogleGenerativeAI(API_KEY)

// Store for chat sessions (in-memory for demo; use database in production)
const chatSessions = new Map()

const getOrCreateSession = (chatId) => {
  if (!chatSessions.has(chatId)) {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash-preview-05-20',
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
    })
    
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 8192,
      },
    })
    
    chatSessions.set(chatId, { chat, history: [] })
  }
  return chatSessions.get(chatId)
}

export const chatController = async (req, res) => {
  try {
    const { message, chatId } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const sessionId = chatId || 'default'
    const session = getOrCreateSession(sessionId)

    // Send message to Gemini
    const result = await session.chat.sendMessage(message)
    const response = result.response.text()

    // Store in history
    session.history.push(
      { role: 'user', content: message },
      { role: 'model', content: response }
    )

    res.json({ 
      response,
      chatId: sessionId
    })
  } catch (error) {
    console.error('Chat error:', error)
    
    // Handle specific API errors
    if (error.message?.includes('API key')) {
      return res.status(401).json({ 
        error: 'Invalid API key',
        response: 'There was an issue with the API configuration. Please check the API key.'
      })
    }
    
    if (error.message?.includes('quota')) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        response: 'API rate limit reached. Please try again in a moment.'
      })
    }

    res.status(500).json({ 
      error: 'Failed to generate response',
      response: 'Sorry, I encountered an error. Please try again.'
    })
  }
}

export const newChatController = async (req, res) => {
  try {
    const { chatId } = req.body
    
    if (chatId && chatSessions.has(chatId)) {
      chatSessions.delete(chatId)
    }

    res.json({ 
      success: true,
      message: 'New chat session created'
    })
  } catch (error) {
    console.error('New chat error:', error)
    res.status(500).json({ error: 'Failed to create new chat' })
  }
}

export const historyController = async (req, res) => {
  try {
    const { chatId } = req.query
    
    if (chatId && chatSessions.has(chatId)) {
      const session = chatSessions.get(chatId)
      return res.json({ history: session.history })
    }

    res.json({ history: [] })
  } catch (error) {
    console.error('History error:', error)
    res.status(500).json({ error: 'Failed to get history' })
  }
}
