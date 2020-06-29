const {
  LANGS: { EN, RU },
} = require('../constants/langs')
const ML = require('../helpers/ml')

exports.COMMAND_BACK_HELP_TEXT = ML({
  [EN]: 'Back help',
  [RU]: '...Помощь',
})

exports.COMMAND_CURRENT_TEXT = ML({
  [EN]: 'Current game',
  [RU]: 'Текущая игра',
})

exports.COMMAND_FOLLOW_TEXT = ML({
  [EN]: 'Follow the game',
  [RU]: 'Следить за игрой',
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
exports.COMMAND_HELP_BOT_TEXT = ML({
  [EN]: 'Bot info',
  [RU]: 'О боте',
})

exports.COMMAND_HELP_GAME_TEXT = ML({
  [EN]: 'Game info',
  [RU]: 'По игре',
})

exports.COMMAND_HELP_FOLLOW_TEXT = ML('Follow info')

exports.COMMAND_HELP_ADMIN_TEXT = ML('Admin info')
