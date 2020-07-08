const ML = require('../../helpers/ml')
const {
  LANGS: { EN, RU },
} = require('../../constants/langs')
const { rootCommands } = require('./commands')

exports.startMessage = ML(ctx => {
  const displayName = ctx.user && (ctx.user.displayName || ctx.user.username)
  let msg = displayName ? `Привет *${displayName}*!` : ''

  msg += '\n\n'

  msg += '*Доступные команды:*'

  rootCommands(ctx).forEach(({ command, description }) => {
    msg += `\n/${command} - _${description}_`
  })

  return msg
})

exports.COMMAND_CURRENT_TEXT = ML({
  [EN]: 'Current game',
  [RU]: 'Текущая игра',
})

exports.COMMAND_BROADCAST_TEXT = ML({
  [EN]: 'Broadcast',
  [RU]: 'Транслировать',
})

exports.COMMAND_ADMIN_TEXT = ML({
  [EN]: 'Admin',
  [RU]: 'Администрирование',
})

// HELP COMMANDS
exports.COMMAND_HELP_TEXT = ML({
  [EN]: 'Help',
  [RU]: 'Помощь',
})
