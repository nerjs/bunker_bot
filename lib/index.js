require('./db').autoConnect()
const logger = require('nlogs')(module)
const bot = require('./bot')
// MIDDLEWARES
const errorMiddleware = require('./middlewares/errorHandler')
const withDisplayName = require('./middlewares/withDisplayName')

logger.info('Start bot')

// MIDDLEWARES
bot.use(errorMiddleware)
bot.use(withDisplayName)

// ROUTES
// TODO: Получать юзера и админа при каждом запросе
require('./routes/start')
require('./routes/help')

bot.on('text', msg => logger.info('\n\n', msg, '\n\n'))

bot.launch()
