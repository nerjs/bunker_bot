const Markup = require('telegraf/markup')
const {
  ACTION_HELP,
  ACTION_HELP_ADMIN,
  ACTION_HELP_BOT,
  ACTION_HELP_FOLLOW,
  ACTION_HELP_GAME,
} = require('../constants/actions')
const {
  COMMAND_BACK_HELP_TEXT,
  COMMAND_HELP_ADMIN_TEXT,
  COMMAND_HELP_BOT_TEXT,
  COMMAND_HELP_FOLLOW_TEXT,
  COMMAND_HELP_GAME_TEXT,
} = require('../messages/commands')

const commands = [
  [ACTION_HELP_BOT, COMMAND_HELP_BOT_TEXT],
  [ACTION_HELP_FOLLOW, COMMAND_HELP_FOLLOW_TEXT],
  [ACTION_HELP_GAME, COMMAND_HELP_GAME_TEXT],
  [ACTION_HELP_ADMIN, COMMAND_HELP_ADMIN_TEXT],
  [ACTION_HELP, COMMAND_BACK_HELP_TEXT],
]

module.exports = (ctx, exclude = []) => {
  if (!exclude || !Array.isArray(exclude) || !exclude.length) return module.exports(ctx, [ACTION_HELP])

  return Markup.inlineKeyboard(
    commands
      .filter(([action]) => !exclude.includes(action))
      .map(([action, text]) => Markup.callbackButton(text(ctx), action))
      .reduce((result, current, i) => {
        if (!(i % 2)) result.push([])
        result[result.length - 1].push(current)
        return result
      }, []),
  )
}
