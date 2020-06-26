require('./db').autoConnect()
const logger = require('nlogs')(module)
const bot = require('./bot')
// MIDDLEWARES
const errorMiddleware = require('./middlewares/errorHandler')
const onlyPrivate = require('./middlewares/onlyPrivate')
const withAdmin = require('./middlewares/withAdmin')
const withDisplayName = require('./middlewares/withDisplayName')
const withUser = require('./middlewares/withUser')
// HANDLERS
const start = require('./handlers/start')

logger.info('Start bot')

// MIDDLEWARES
bot.use(errorMiddleware)
bot.use(withDisplayName)

// WORKERS
bot.start(onlyPrivate, withAdmin, withUser, start)

// bot.on('text', msg => logger.info('\n\n', msg, '\n\n'))

bot.launch()
