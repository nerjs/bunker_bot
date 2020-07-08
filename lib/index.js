const { autoConnect } = require('./db')
const logger = require('nlogs')(module)
const { session } = require('telegraf')
const updateLogger = require('telegraf-update-logger')
const { bot } = require('./bot')
// MIDDLEWARES
const notFound = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/errorHandler')
const withUserMiddleware = require('./middlewares/withUser')

// SCENES
const rootScene = require('./scenes')

logger.info('Start bot')

bot.use(updateLogger({ colors: true }))
bot.use(session())
bot.use(withUserMiddleware)

// ROUTES
bot.use(rootScene)

bot.use(notFound)

bot.catch(errorMiddleware)

autoConnect()
  .then(() => {
    logger.info('Success started!')
    return bot.launch()
  })
  .catch(e => {
    logger.error(e)
    process.exit()
  })
