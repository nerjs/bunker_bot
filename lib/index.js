require('./db').autoConnect()
const logger = require('nlogs')(module)
const bot = require('./bot')
// MIDDLEWARES
const errorMiddleware = require('./middlewares/errorHandler')
const onlyPrivate = require('./middlewares/onlyPrivate')
const withAdmin = require('./middlewares/withAdmin')
const onlyAdmin = require('./middlewares/onlyAdmin')
const withDisplayName = require('./middlewares/withDisplayName')
const withUser = require('./middlewares/withUser')
// HANDLERS
const start = require('./handlers/start')
const help = require('./handlers/help')
const { helpAdminDetails, helpBotDetails, helpFollowDetails, helpGameDetails } = require('./handlers/helpDetails')
// CONSTANTS
const {
  COMMAND_HELP,
  COMMAND_HELP_ADMIN,
  COMMAND_HELP_BOT,
  COMMAND_HELP_FOLLOW,
  COMMAND_HELP_GAME,
} = require('./constants/commands')

logger.info('Start bot')

// MIDDLEWARES
bot.use(errorMiddleware)
bot.use(withDisplayName)

// WORKERS
bot.start(onlyPrivate, withUser, start)

bot.help(help(true))
bot.hears(COMMAND_HELP, help(false))
;[
  [COMMAND_HELP, withAdmin, help(false)],
  [COMMAND_HELP_ADMIN, onlyAdmin, helpAdminDetails],
  [COMMAND_HELP_BOT, withAdmin, helpBotDetails],
  [COMMAND_HELP_FOLLOW, withAdmin, helpFollowDetails],
  [COMMAND_HELP_GAME, withAdmin, helpGameDetails],
].forEach(([action, ...mdw]) => {
  bot.action(`${COMMAND_HELP}_${action}`, ...mdw)
})

// bot.on('message', msg => logger.info('\n\n', msg, '\n\n'))

bot.launch()
