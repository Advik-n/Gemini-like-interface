// Chat storage utilities using sessionStorage

const CHATS_KEY = 'gemini_chats'
const CURRENT_CHAT_KEY = 'gemini_current_chat'

export const getChatHistory = () => {
  try {
    const chats = sessionStorage.getItem(CHATS_KEY)
    return chats ? JSON.parse(chats) : []
  } catch (error) {
    console.error('Error reading chat history:', error)
    return []
  }
}

export const saveChatHistory = (chats) => {
  try {
    sessionStorage.setItem(CHATS_KEY, JSON.stringify(chats))
  } catch (error) {
    console.error('Error saving chat history:', error)
  }
}

export const getCurrentChatId = () => {
  try {
    return sessionStorage.getItem(CURRENT_CHAT_KEY)
  } catch (error) {
    console.error('Error reading current chat ID:', error)
    return null
  }
}

export const setCurrentChatId = (chatId) => {
  try {
    sessionStorage.setItem(CURRENT_CHAT_KEY, chatId)
  } catch (error) {
    console.error('Error saving current chat ID:', error)
  }
}

export const clearAllChats = () => {
  try {
    sessionStorage.removeItem(CHATS_KEY)
    sessionStorage.removeItem(CURRENT_CHAT_KEY)
  } catch (error) {
    console.error('Error clearing chats:', error)
  }
}
