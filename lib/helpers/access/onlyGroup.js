const BotError = require('../error')
const isGroup = require('./isGroup')
const { ONLY_GROUP_ERROR } = require('../../messages/errorMessages')

module.exports = async msg => {
  if (!isGroup(msg)) throw new BotError('Forbidden', ONLY_GROUP_ERROR, msg)
}
