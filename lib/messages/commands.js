const {
  LANGS: { EN, RU },
} = require('../constants/langs')
const ML = require('../helpers/ml')

exports.COMMAND_BACK_TEXT = ML({
  [EN]: 'Back',
  [RU]: 'Назад',
})

exports.COMMAND_OK_TEXT = ML('Ok')
exports.COMMAND_CANCEL_TEXT = ML({
  [EN]: 'Cancel',
  [RU]: 'Отмена',
})

exports.COMMAND_HOME_TEXT = ML({
  [EN]: 'Home menu',
  [RU]: 'Главное меню',
})

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

// ADMIN COMMANDS
exports.COMMAND_ADMIN_LIST_TEXT = ML('Admin list')
exports.COMMAND_ADMIN_ADD_TEXT = ML('Add admin')
exports.COMMAND_ADMIN_REMOVE_TEXT = ML('Remove admin')

exports.COMMAND_ADMIN_FEATURES_TEXT = ML('Характеристики')
exports.COMMAND_ADMIN_CARDS_TEXT = ML('Карты действий')
exports.COMMAND_ADMIN_TIMINGS_TEXT = ML('Тайминги')
exports.COMMAND_ADMIN_CONFIRM_SUPERADMIN_TEXT = ML('Superadmin')
