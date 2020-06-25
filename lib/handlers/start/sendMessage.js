const { COMMAND_ADMIN, COMMAND_CURRENT, COMMAND_FOLLOW, COMMAND_HELP } = require('../../constants/commands')
const {
  COMMAND_ADMIN_DESC,
  COMMAND_CURRENT_DESC,
  COMMAND_FOLLOW_DESC,
  COMMAND_HELP_DESC,
} = require('../../messages/commandDescriptions')
const buildStartMessage = require('../../messages/buildStartMessage')

module.exports = async ctx => {
  const commands = [
    [COMMAND_HELP, COMMAND_HELP_DESC],
    [COMMAND_CURRENT, COMMAND_CURRENT_DESC],
    [COMMAND_FOLLOW, COMMAND_FOLLOW_DESC],
  ].map(([command, description]) => ({ command, description }))

  const keyboardArr = [COMMAND_HELP, COMMAND_CURRENT, COMMAND_FOLLOW].map(text => ({ text }))

  if (ctx.isAdmin) {
    commands.push({
      command: COMMAND_ADMIN,
      description: COMMAND_ADMIN_DESC,
    })

    keyboardArr.push({ text: COMMAND_ADMIN })
  }

  const keyboard =
    keyboardArr.length < 4
      ? [keyboardArr]
      : keyboardArr.reduce(
          (kb, cur, i) => {
            kb[i % 2 ? 1 : 0].push(cur)
            return kb
          },
          [[], []],
        )

  await ctx.setMyCommands(commands)
  await ctx.replyWithMarkdown(buildStartMessage(ctx, commands), {
    reply_markup: {
      keyboard,
      resize_keyboard: true,
    },
  })
}
