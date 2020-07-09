const { RootScene } = require('../bot')
const onlyPrivateMiddleware = require('../middlewares/onlyPrivate')
const onlyAdmin = require('../middlewares/onlyAdmin')
const startHandler = require('./root/start')
const reloadHandler = require('./root/reload')
const { COMMAND_HELP, COMMAND_ADMIN } = require('./root/commands')
const keyboard = require('./root/keyboard')
const { rootCommands } = require('./root/commands')
const { rootHello } = require('./root/messages')
const { MLC_HELP, MLC_CURRENT, MLC_BROADCAST, MLC_ADMIN } = require('./root/mlc')
const { MLC_BACK, MLC_HOME } = require('./common/mlc')
const { COMMAND_RELOAD } = require('./common/commands')

// SCENES
const helpScene = require('./help')
const adminScene = require('./admin')

const rootScene = new RootScene()
rootScene.markup(keyboard)
rootScene.message(rootHello)
rootScene.commands(rootCommands)

rootScene.start(onlyPrivateMiddleware, startHandler)
rootScene.command(COMMAND_RELOAD, reloadHandler)

rootScene.register(helpScene)
rootScene.command(COMMAND_HELP, RootScene.enter(helpScene))
rootScene.hears(MLC_HELP, RootScene.enter(helpScene))

rootScene.register(adminScene)
rootScene.command(COMMAND_ADMIN, onlyPrivateMiddleware, onlyAdmin, RootScene.enter(adminScene))
rootScene.hears(MLC_ADMIN, onlyPrivateMiddleware, onlyAdmin, RootScene.enter(adminScene))

// rootScene.hears(MLC_BACK, RootScene.root())
// rootScene.command('back', RootScene.root())
// rootScene.hears(MLC_HOME, RootScene.root())
// rootScene.command('home', RootScene.root())

module.exports = rootScene
