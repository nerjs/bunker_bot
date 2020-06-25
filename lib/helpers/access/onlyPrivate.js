const BotError = require('../error')
const isPrivate = require('./isPrivate')
const { ONLY_PRIVATE_ERROR } = require('../../messages/errorMessages')

module.exports = async msg => {
  if (!isPrivate(msg)) throw new BotError('Forbidden', ONLY_PRIVATE_ERROR, msg)
}
