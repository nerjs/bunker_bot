const { COMMAND_ADMIN, COMMAND_CURRENT, COMMAND_FOLLOW, COMMAND_HELP } = require('../../constants/commands')
const {
  COMMAND_ADMIN_DESC,
  COMMAND_CURRENT_DESC,
  COMMAND_FOLLOW_DESC,
  COMMAND_HELP_DESC,
} = require('../../messages/commandDescriptions')
const buildStartMessage = require('../../messages/buildStartMessage')
const { coreKeyboard } = require('../../keyboards')

module.exports = async ctx => {
  const commands = [
    [COMMAND_HELP, COMMAND_HELP_DESC(ctx)],
    [COMMAND_CURRENT, COMMAND_CURRENT_DESC(ctx)],
    [COMMAND_FOLLOW, COMMAND_FOLLOW_DESC(ctx)],
  ].map(([command, description]) => ({ command, description }))

  if (ctx.isAdmin) {
    commands.push({
      command: COMMAND_ADMIN,
      description: COMMAND_ADMIN_DESC(ctx),
    })
  }

  await ctx.setMyCommands(commands)
  await ctx.replyWithMarkdown(buildStartMessage(ctx, commands), coreKeyboard(ctx).extra())
}
