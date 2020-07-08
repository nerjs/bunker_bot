const { IS_MODIFIED } = require('./modify')
const { Telegraf } = require('telegraf')
const { Context, Scene, RootScene } = require('./tree')

const { TELEGRAM_TOKEN } = process.env

const bot = new Telegraf(TELEGRAM_TOKEN)

exports = module.exports = bot
exports.bot = bot
exports.Scene = Scene
exports.RootScene = RootScene
exports.SceneContext = Context

exports.IS_MODIFIED = IS_MODIFIED
