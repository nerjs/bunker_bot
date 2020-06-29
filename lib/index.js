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
const {
  helpAdminDetails,
  helpBotDetails,
  helpFollowDetails,
  helpGameDetails,
  helpCoreCommand,
  helpCoreDetails,
} = require('./handlers/help')
// CONSTANTS
const { MLC_HELP } = require('./constants/mlc')
const {
  ACTION_HELP,
  ACTION_HELP_ADMIN,
  ACTION_HELP_BOT,
  ACTION_HELP_FOLLOW,
  ACTION_HELP_GAME,
} = require('./constants/actions')

logger.info('Start bot')

// MIDDLEWARES
bot.use(errorMiddleware)
bot.use(withDisplayName)

// WORKERS
bot.start(onlyPrivate, withUser, start)

bot.help(helpCoreCommand)
bot.hears(MLC_HELP, helpCoreDetails)
;[
  [ACTION_HELP, withAdmin, helpCoreDetails],
  [ACTION_HELP_ADMIN, onlyAdmin, helpAdminDetails],
  [ACTION_HELP_BOT, withAdmin, helpBotDetails],
  [ACTION_HELP_FOLLOW, withAdmin, helpFollowDetails],
  [ACTION_HELP_GAME, withAdmin, helpGameDetails],
].forEach(mdw => bot.action(...mdw))

bot.on('text', msg => logger.info('\n\n', msg, '\n\n'))

bot.launch()
