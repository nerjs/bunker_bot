const { COMMAND_HELP_ADMIN, COMMAND_HELP_BOT, COMMAND_HELP_FOLLOW, COMMAND_HELP_GAME } = require('../../constants/commands')
const { helpAdminDetails, helpBotDetails, helpFollowDetails, helpGameDetails } = require('../helpDetails')
const privateHelp = require('./privateHelp')
const groupHelp = require('./groupHelp')
const { isGroup, isPrivate } = require('../../helpers/access')

const details = {
  [COMMAND_HELP_BOT]: helpBotDetails,
  [COMMAND_HELP_FOLLOW]: helpFollowDetails,
  [COMMAND_HELP_GAME]: helpGameDetails,
  [COMMAND_HELP_ADMIN]: helpAdminDetails,
}

module.exports = (ctx, isCommand) => {
  const {
    message: { text },
  } = ctx

  if (isCommand) {
    const commandInMessage = [COMMAND_HELP_ADMIN, COMMAND_HELP_BOT, COMMAND_HELP_FOLLOW, COMMAND_HELP_GAME].find(
      command => text.search(new RegExp(`\\s${command}`)) > 0,
    )

    if (commandInMessage && details[commandInMessage]) return details[commandInMessage]
  }

  if (isGroup(ctx)) return groupHelp
  if (isPrivate(ctx)) return privateHelp

  return null
}
