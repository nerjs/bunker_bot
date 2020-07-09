const {
  LANGS: { EN, RU },
} = require('../../constants/langs')
const ML = require('../../helpers/ml')

exports.COMMAND_BACK_TEXT = ML({
  [EN]: 'Back',
  [RU]: 'Назад',
})

exports.COMMAND_HOME_TEXT = ML({
  [EN]: 'Home menu',
  [RU]: 'Главное меню',
})

exports.ACTION_OK_TEXT = ML('Ok')
exports.ACTION_CANCEL_TEXT = ML({
  [EN]: 'Cancel',
  [RU]: 'Отмена',
})

exports.COMMAND_RELOAD_TEXT = ML('Reload session')
