const bot = require('../bot')

module.exports = msg => {
  bot.sendMessage(msg.chat.id, 'Text')
}
