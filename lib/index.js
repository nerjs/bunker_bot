require('./db').autoConnect()
const logger = require('nlogs')(module)
const bot = require('./bot')
// MIDDLEWARES
const errorMiddleware = require('./middlewares/errorHandler')
const onlyPrivate = require('./middlewares/onlyPrivate')
// HANDLERS
const start = require('./handlers/start')

logger.info('Start bot')

// MIDDLEWARES
bot.use(errorMiddleware)

// WORKERS
// bot.onText(START, wrapper(start))
bot.start(onlyPrivate, start)

// bot.on('text', msg => logger.info('\n\n', msg, '\n\n'))

bot.launch()
