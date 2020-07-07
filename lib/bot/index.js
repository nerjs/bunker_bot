const { IS_MODIFIED } = require('./modify')
const { session, Telegraf } = require('telegraf')
const updateLogger = require('telegraf-update-logger')
const { Context, Scene, RootScene } = require('./tree')

const { TELEGRAM_TOKEN } = process.env

const bot = new Telegraf(TELEGRAM_TOKEN)
const rootScene = new RootScene()

// TODO: Настроить мидлверы
bot.use(updateLogger({ colors: true }))
bot.use(session())
bot.use(rootScene)

exports = module.exports = bot
exports.bot = rootScene
exports.rootScene = rootScene
exports.Scene = Scene
exports.RootScene = RootScene
exports.SceneContext = Context

exports.IS_MODIFIED = IS_MODIFIED
