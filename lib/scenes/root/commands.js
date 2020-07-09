const ML = require('../../helpers/ml')
const { COMMAND_RELOAD } = require('../common/commands')
const { COMMAND_RELOAD_TEXT } = require('../common/messages')

exports.COMMAND_HELP_DESC = ML('Command help desc')
exports.COMMAND_ADMIN_DESC = ML('Command admin desc')
exports.COMMAND_CURRENT_DESC = ML('Command current desc')
exports.COMMAND_BROADCAST_DESC = ML('Command broadcast desc')

exports.COMMAND_HELP = 'help'
exports.COMMAND_ADMIN = 'admin'
exports.COMMAND_CURRENT = 'current'
exports.COMMAND_BROADCAST = 'broadcast'

exports.rootCommands = ctx => {
  const commands = [
    [exports.COMMAND_HELP, exports.COMMAND_HELP_DESC(ctx)],
    [exports.COMMAND_CURRENT, exports.COMMAND_CURRENT_DESC(ctx)],
    [exports.COMMAND_BROADCAST, exports.COMMAND_BROADCAST_DESC(ctx)],
  ].map(([command, description]) => ({ command, description }))

  if (ctx.isAdmin) {
    commands.push({
      command: exports.COMMAND_ADMIN,
      description: exports.COMMAND_ADMIN_DESC(ctx),
    })
  }

  commands.push({ command: COMMAND_RELOAD, description: COMMAND_RELOAD_TEXT(ctx) })

  return commands
}
