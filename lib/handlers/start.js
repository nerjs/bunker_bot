const bot = require('../bot')
const { isAdmin, isMe, isGroup, isPrivate } = require('../helpers/access')
const { BotError, SilentBotError } = require('../helpers/error')
const startGame = require('./startGame')
const sleep = require('helpers-promise/sleep')
const typing = require('../helpers/typing')
const { COMMAND_ADMIN, COMMAND_CURRENT, COMMAND_FOLLOW, COMMAND_HELP } = require('../constants/commands')
const {
  COMMAND_ADMIN_DESC,
  COMMAND_CURRENT_DESC,
  COMMAND_FOLLOW_DESC,
  COMMAND_HELP_DESC,
} = require('../messages/commandDescriptions')
const buildStartMessage = require('../messages/buildStartMessage')

module.exports = async ctx => {
  const commands = [
    [COMMAND_HELP, COMMAND_HELP_DESC],
    [COMMAND_CURRENT, COMMAND_CURRENT_DESC],
    [COMMAND_FOLLOW, COMMAND_FOLLOW_DESC],
  ].map(([command, description]) => ({ command, description }))

  const keyboardArr = [COMMAND_HELP, COMMAND_CURRENT, COMMAND_FOLLOW].map(text => ({ text }))

  const admin = await isAdmin(ctx)
  if (admin) {
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
      // one_time_keyboard: true,
      resize_keyboard: true,
    },
  })
}
