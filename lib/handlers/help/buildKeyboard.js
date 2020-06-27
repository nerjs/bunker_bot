const Markup = require('telegraf/markup')
const {
  COMMAND_HELP,
  COMMAND_HELP_ADMIN,
  COMMAND_HELP_BOT,
  COMMAND_HELP_FOLLOW,
  COMMAND_HELP_GAME,
} = require('../../constants/commands')

const commands = [
  [COMMAND_HELP_BOT, COMMAND_HELP_BOT],
  [COMMAND_HELP_FOLLOW, COMMAND_HELP_FOLLOW],
  [COMMAND_HELP_GAME, COMMAND_HELP_GAME],
  [COMMAND_HELP_ADMIN, COMMAND_HELP_ADMIN],
  [COMMAND_HELP, COMMAND_HELP],
]

module.exports = (exclude = []) =>
  Markup.inlineKeyboard(
    commands
      .filter(([, command]) => !exclude.includes(command))
      .map(([text, command]) => Markup.callbackButton(text, `${COMMAND_HELP}_${command}`))
      .reduce((result, current, i) => {
        if (!(i % 2)) result.push([])
        result[result.length - 1].push(current)
        return result
      }, []),
  )
