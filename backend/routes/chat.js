import express from 'express'
import { chatController, newChatController, historyController } from '../controllers/chatController.js'

const router = express.Router()

// POST /api/chat - Send a message and get AI response
router.post('/chat', chatController)

// POST /api/new - Create a new chat session
router.post('/new', newChatController)

// GET /api/history - Get chat history (placeholder for server-side storage)
router.get('/history', historyController)

export default router
