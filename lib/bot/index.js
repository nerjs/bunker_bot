const { IS_MODIFIED } = require('./modify')
const { Telegraf, session, Stage, Markup } = require('telegraf')
const Scene = require('telegraf/scenes/base')
const updateLogger = require('telegraf-update-logger')

const { TELEGRAM_TOKEN } = process.env

const bot = new Telegraf(TELEGRAM_TOKEN)
const stage = new Stage()

// TODO: Настроить мидлверы
bot.use(updateLogger({ colors: true }))
bot.use(session())

exports = module.exports = bot
exports.bot = bot
exports.stage = stage
exports.Scene = Scene
exports.sceneEnter = Stage.enter
exports.sceneLeave = Stage.leave

exports.IS_MODIFIED = IS_MODIFIED
