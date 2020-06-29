const { Telegraf, session, Stage } = require('telegraf')
const Scene = require('telegraf/scenes/base')
const { IS_MLC } = require('./helpers/mlc')

const { TELEGRAM_TOKEN } = process.env

class ModTelegraf extends Telegraf {
  hears(command, ...middlewares) {
    if (command[IS_MLC]) return super.hears(command.regexp, command.middleware, ...middlewares)
    return super.hears(command, ...middlewares)
  }
}

const bot = new ModTelegraf(TELEGRAM_TOKEN)

const stage = new Stage()

bot.use(session())

exports = module.exports = bot
exports.bot = bot
exports.stage = stage
exports.Scene = Scene
exports.sceneEnter = Stage.enter
exports.sceneLeave = Stage.leave
