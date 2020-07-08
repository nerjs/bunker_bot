const { RootScene } = require('../bot')
const onlyPrivateMiddleware = require('../middlewares/onlyPrivate')
const startHandler = require('./root/start')
const { COMMAND_HELP } = require('./root/commands')
const keyboard = require('./root/keyboard')
const { rootCommands } = require('./root/commands')
const { rootHello } = require('./root/messages')
const { MLC_HELP, MLC_CURRENT, MLC_BROADCAST, MLC_ADMIN } = require('./root/mlc')
const { MLC_BACK, MLC_HOME } = require('./common/mlc')

// SCENES
const helpScene = require('./help')

const rootScene = new RootScene()
rootScene.markup(keyboard)
rootScene.message(rootHello)
rootScene.commands(rootCommands)

rootScene.start(onlyPrivateMiddleware, startHandler)

rootScene.register(helpScene)
rootScene.command(COMMAND_HELP, RootScene.child(helpScene))
rootScene.hears(MLC_HELP, RootScene.child(helpScene))

rootScene.hears(MLC_BACK, RootScene.back())
rootScene.command('back', RootScene.back())
rootScene.hears(MLC_HOME, RootScene.root())
rootScene.command('home', RootScene.root())

module.exports = rootScene
