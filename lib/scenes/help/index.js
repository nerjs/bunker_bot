const { Scene } = require('../../bot')
const { helpHello, helpAdmin, helpBot, helpBroadcast, helpGame } = require('./messages')
const keyboard = require('./keyboard')
const { MLC_BACK } = require('../common/mlc')
const { MLC_HELP_BOT, MLC_HELP_GAME, MLC_HELP_BROADCAST, MLC_HELP_ADMIN } = require('./mlc')
const onlyAdmin = require('../../middlewares/onlyAdmin')

const helpScene = new Scene('help')
helpScene.message(helpHello)
helpScene.markup(keyboard)

helpScene.hears(MLC_BACK, Scene.root())

const handler = fn => ctx => ctx.replyWithMarkdown(fn(ctx))

helpScene.hears(MLC_HELP_BOT, handler(helpBot))
helpScene.hears(MLC_HELP_GAME, handler(helpGame))
helpScene.hears(MLC_HELP_BROADCAST, handler(helpBroadcast))
helpScene.hears(MLC_HELP_ADMIN, onlyAdmin, handler(helpAdmin))

module.exports = helpScene
