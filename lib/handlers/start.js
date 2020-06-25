const bot = require('../bot')
const { isAdmin, isMe, isGroup, isPrivate } = require('../helpers/access')
const getText = require('../helpers/getText')
const BotError = require('../helpers/error')
const startGame = require('./startGame')
const sleep = require('helpers-promise/sleep')
const typing = require('../helpers/typing')
const {COMMAND_EDIT_DESC, COMMAND_GAME_DESC, COMMAND_INFO_DESC} = require('../constants/messages')

module.exports = async (msg, matched) => {
  if (isGroup(msg)) {
    if (!isMe(matched, true)) return
    return startGame(msg, matched)
  }

  if (!isPrivate(msg)) return

  typing(msg)

  const admin = await isAdmin(msg)

  const commands = [
    {
      command: '/info',
      description: 'test',
    },
  ]

  await bot.setMyCommands(commands)

  bot.sendMessage(msg.chat.id, await getText('start'), {
    parse_mode: 'markdown',
  })
}
