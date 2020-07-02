const { autoConnect } = require('./db')
const logger = require('nlogs')(module)
const { bot, stage } = require('./bot')
// MIDDLEWARES
const errorMiddleware = require('./middlewares/errorHandler')
const withDisplayName = require('./middlewares/withDisplayName')
const withAdmin = require('./middlewares/withAdmin')
const notFound = require('./middlewares/notFound')

logger.info('Start bot')

// MIDDLEWARES
bot.use(errorMiddleware)
bot.use(withDisplayName)
bot.use(withAdmin)
bot.use(stage.middleware())

// ROUTES
// TODO: Получать юзера и админа при каждом запросе
require('./routes/start')
require('./routes/help')
require('./routes/admin')

bot.use(notFound)

autoConnect()
  .then(() => {
    logger.info('Success started!')
    bot.launch()
  })
  .catch(e => {
    logger.error(e)
    process.exit()
  })
