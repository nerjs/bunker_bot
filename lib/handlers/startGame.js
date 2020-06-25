const bot = require('../bot')
const asyncInterval = require('helpers-promise/interval')

let i = 0
module.exports = async msg => {
  bot.sendMessage(msg.chat.id, 'Start game')

  const res = await bot.sendPoll(msg.chat.id, 'Test', ['@neerjs', 'test2', 'test3'], {
    // type: 'quiz',
    is_anonymous: false,
    // correct_option_id: 1,
  })
}
