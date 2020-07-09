const {
  LANGS: { EN, RU },
} = require('../constants/langs')
const ML = require('../helpers/ml')

exports.FORBIDDEN = 'Forbidden'
exports.FORBIDDEN_MESSAGE_ERROR = ML('Forbidden message error')

exports.UNKNOWN_ERROR = ML({
  [EN]: 'Something went wrong',
  [RU]: 'Что-то пошло не так',
})

exports.ONLY_ADMIN_ERROR = ML('Only admin')
exports.ONLY_GROUP_ERROR = ML('Only group')
exports.ONLY_PRIVATE_ERROR = ML('Only private')
exports.ONLY_ME_ERROR = ML('Only me')
exports.UNKNOWN_CHAT_TYPE_ERROR = ML('Unknown chat type')

exports.NOT_FOUND_MESSAGE = ML('Ничего не понял. Можно еще раз?')
exports.NOT_FOUND_CB_QUERY = ML('Неизвестная команда. Можно еще раз?')
