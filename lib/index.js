require('./db').autoConnect()
const logger = require('nlogs')(module)
const bot = require('./bot')
// CONSTANTS
const { START } = require('./constants/commands')
// HELPERS
const wrapper = require('./helpers/wrapper')
// HANDLERS
const start = require('./handlers/start')

logger.info('Start bot')

// WORKERS
bot.onText(START, wrapper(start))

bot.on('message', msg => logger.info('\n\n', msg, '\n\n'))
