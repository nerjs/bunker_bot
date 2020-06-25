const bot = require('../bot')
const logger = require('nlogs')(module)
const sleep = require('helpers-promise/sleep')

module.exports = (fn, _options = {}) => async (...args) => {
  const [msg] = args
  try {
    await fn(...args)
  } catch (e) {
    await sleep(1000)
    logger.error(e)
    bot.sendMessage(msg.chat.id, e.clientMessage || e.message)
  }
}
