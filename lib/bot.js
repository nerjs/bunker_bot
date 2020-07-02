const { Telegraf, session, Stage, Markup } = require('telegraf')
const Scene = require('telegraf/scenes/base')
const updateLogger = require('telegraf-update-logger')
const { IS_MLC } = require('./helpers/mlc')

const { TELEGRAM_TOKEN } = process.env

class ModTelegraf extends Telegraf {
  hears(command, ...middlewares) {
    if (command[IS_MLC]) return super.hears(command.regexp, command.middleware, ...middlewares)
    return super.hears(command, ...middlewares)
  }
}

class ModScene extends Scene {
  hears(command, ...middlewares) {
    if (command[IS_MLC]) return super.hears(command.regexp, command.middleware, ...middlewares)
    return super.hears(command, ...middlewares)
  }
}

Markup.prototype.concat = function(markup) {
  if (!(markup instanceof Markup)) return this
  Object.keys(markup).forEach(key => {
    this[key] = markup[key]
  })
  return this
}

const bot = new ModTelegraf(TELEGRAM_TOKEN)
const stage = new Stage()

// TODO: Настроить мидлверы
bot.use(updateLogger({ colors: true }))
bot.use(session())

exports = module.exports = bot
exports.bot = bot
exports.stage = stage
exports.Scene = ModScene
exports.sceneEnter = Stage.enter
exports.sceneLeave = Stage.leave
