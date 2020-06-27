const {
  COMMAND_HELP_BOT,
  COMMAND_HELP_ADMIN,
  COMMAND_HELP_FOLLOW,
  COMMAND_HELP_GAME,
  COMMAND_HELP,
} = require('../../constants/commands')
const { isAdmin, isGroup, isPrivate } = require('../../helpers/access')
const { ForbiddenBotError } = require('../../helpers/error')
const getHelpBot = require('../../messages/help/bot')
const getHelpGame = require('../../messages/help/game')
const getHelpFollow = require('../../messages/help/follow')
const getHelpAdmin = require('../../messages/help/admin')
const getHelpCore = require('../../messages/help/core')
const sendAnswer = require('./sendAnswer')

const helpGameDetails = ctx => sendAnswer(ctx, getHelpGame, COMMAND_HELP_GAME)
const helpBotDetails = ctx => sendAnswer(ctx, getHelpBot, COMMAND_HELP_BOT)
const helpFollowDetails = ctx => sendAnswer(ctx, getHelpFollow, COMMAND_HELP_FOLLOW)
const helpAdminDetails = async ctx => {
  if ((await isAdmin(ctx)) && isPrivate(ctx)) return sendAnswer(ctx, getHelpAdmin, COMMAND_HELP_ADMIN)
  throw new ForbiddenBotError(ctx)
}

const helpCoreDetails = ctx => sendAnswer(ctx, getHelpCore, COMMAND_HELP)

const details = {
  [COMMAND_HELP_BOT]: helpBotDetails,
  [COMMAND_HELP_FOLLOW]: helpFollowDetails,
  [COMMAND_HELP_GAME]: helpGameDetails,
  [COMMAND_HELP_ADMIN]: helpAdminDetails,
}

const helpCoreCommand = async ctx => {
  const {
    message: { text },
  } = ctx

  const commandInMessage = [COMMAND_HELP_ADMIN, COMMAND_HELP_BOT, COMMAND_HELP_FOLLOW, COMMAND_HELP_GAME].find(
    command => text.search(new RegExp(`\\s${command}`)) > 0,
  )

  if (commandInMessage && details[commandInMessage]) return details[commandInMessage](ctx)

  return helpCoreDetails(ctx)
}

exports.helpGameDetails = helpGameDetails
exports.helpBotDetails = helpBotDetails
exports.helpFollowDetails = helpFollowDetails
exports.helpAdminDetails = helpAdminDetails
exports.helpCoreDetails = helpCoreDetails
exports.helpCoreCommand = helpCoreCommand
