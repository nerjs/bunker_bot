const bot = require('../bot')
const withAdmin = require('../middlewares/withAdmin')
const onlyAdmin = require('../middlewares/onlyAdmin')
const {
  helpAdminDetails,
  helpBotDetails,
  helpFollowDetails,
  helpGameDetails,
  helpCoreCommand,
  helpCoreDetails,
} = require('../handlers/help')
// CONSTANTS
const { MLC_HELP } = require('../constants/mlc')
const {
  ACTION_HELP,
  ACTION_HELP_ADMIN,
  ACTION_HELP_BOT,
  ACTION_HELP_FOLLOW,
  ACTION_HELP_GAME,
} = require('../constants/actions')

bot.help(helpCoreCommand)
bot.hears(MLC_HELP, helpCoreDetails)
;[
  [ACTION_HELP, withAdmin, helpCoreDetails],
  [ACTION_HELP_ADMIN, onlyAdmin, helpAdminDetails],
  [ACTION_HELP_BOT, withAdmin, helpBotDetails],
  [ACTION_HELP_FOLLOW, withAdmin, helpFollowDetails],
  [ACTION_HELP_GAME, withAdmin, helpGameDetails],
].forEach(mdw => bot.action(...mdw))
