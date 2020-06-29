const { COMMAND_ADMIN, COMMAND_CURRENT, COMMAND_FOLLOW, COMMAND_HELP } = require('../../constants/commands')
const { MLC_ADMIN, MLC_CURRENT, MLC_FOLLOW, MLC_HELP } = require('../../constants/mlc')
const {
  COMMAND_ADMIN_DESC,
  COMMAND_CURRENT_DESC,
  COMMAND_FOLLOW_DESC,
  COMMAND_HELP_DESC,
} = require('../../messages/commandDescriptions')
const buildStartMessage = require('../../messages/buildStartMessage')

module.exports = async ctx => {
  const commands = [
    [COMMAND_HELP, COMMAND_HELP_DESC(ctx)],
    [COMMAND_CURRENT, COMMAND_CURRENT_DESC(ctx)],
    [COMMAND_FOLLOW, COMMAND_FOLLOW_DESC(ctx)],
  ].map(([command, description]) => ({ command, description }))

  const keyboardArr = [MLC_HELP(ctx), MLC_CURRENT(ctx), MLC_FOLLOW(ctx)].map(text => ({ text }))

  if (ctx.isAdmin) {
    commands.push({
      command: COMMAND_ADMIN,
      description: COMMAND_ADMIN_DESC(ctx),
    })

    keyboardArr.push({ text: MLC_ADMIN(ctx) })
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
