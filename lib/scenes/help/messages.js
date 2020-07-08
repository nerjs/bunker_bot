const ML = require('../../helpers/ml')
const {
  LANGS: { EN, RU },
} = require('../../constants/langs')

exports.COMMAND_HELP_BOT_TEXT = ML({
  [EN]: 'Bot info',
  [RU]: 'О боте',
})

exports.COMMAND_HELP_GAME_TEXT = ML({
  [EN]: 'Game info',
  [RU]: 'По игре',
})

exports.COMMAND_HELP_BROADCAST_TEXT = ML('Broadcast info')

exports.COMMAND_HELP_ADMIN_TEXT = ML('Admin info')

exports.helpHello = ML('Помощь по игре')

exports.helpBot = ML(`
*Помощь в использовании ботов*
`)

exports.helpGame = ML(`
*Помощь по игре*
`)

exports.helpBroadcast = ML(`
*Как транслировать*
`)

exports.helpAdmin = ML(`
*Администирование*
`)
