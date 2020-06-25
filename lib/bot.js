const TelegramBot = require('node-telegram-bot-api')

const { TELEGRAM_TOKEN } = process.env

exports = module.exports = new TelegramBot(TELEGRAM_TOKEN, { polling: true })

exports.botName = ''
exports.updateBotInfo = async () => {
  exports.botInfo = await exports.getMe()
}

exports.updateBotInfo()
