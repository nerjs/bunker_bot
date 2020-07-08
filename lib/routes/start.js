const bot = require('../bot')
const onlyPrivate = require('../middlewares/onlyPrivate')
const withUser = require('../middlewares/withUser2')
const withAdmin = require('../middlewares/withAdmin')
// HANDLERS
const startHandler = require('../handlers/start')

// WORKERS
bot.start(onlyPrivate, withAdmin, withUser, startHandler)
