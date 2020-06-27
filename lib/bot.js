const { Telegraf } = require('telegraf')
const { IS_MLC } = require('./helpers/mlc')

const { TELEGRAM_TOKEN } = process.env

class ModTelegraf extends Telegraf {
  hears(command, ...middlewares) {
    if (command[IS_MLC]) return super.hears(command.regexp, command.middleware, ...middlewares)
    return super.hears(command, ...middlewares)
  }
}

const bot = new ModTelegraf(TELEGRAM_TOKEN)

module.exports = bot
