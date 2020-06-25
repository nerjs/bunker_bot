const bot = require('../bot')

module.exports = msg => {
  if (typeof msg === 'number') return module.exports({ chat: { id: msg } })

  return bot.sendChatAction(msg.chat.id, 'typing')
}
