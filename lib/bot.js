const { Telegraf } = require('telegraf')

const { TELEGRAM_TOKEN } = process.env

const bot = new Telegraf(TELEGRAM_TOKEN)

module.exports = bot
