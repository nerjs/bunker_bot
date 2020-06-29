const bot = require('../bot')
const onlyPrivate = require('../middlewares/onlyPrivate')
const withUser = require('../middlewares/withUser')
// HANDLERS
const startHandler = require('../handlers/start')

// WORKERS
bot.start(onlyPrivate, withUser, startHandler)
