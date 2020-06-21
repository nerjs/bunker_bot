const TelegramBot = require('node-telegram-bot-api')

const { TELEGRAM_TOKEN } = process.env

module.exports = new TelegramBot(TELEGRAM_TOKEN, { polling: true })
