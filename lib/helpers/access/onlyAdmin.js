const isAdmin = require('./isAdmin')
const BotError = require('../error')
const { ONLY_ADMIN_ERROR } = require('../../messages/errorMessages')

module.exports = async msg => {
  const { from, chat } = msg
  if (!(await isAdmin(msg))) throw new BotError('Forbidden', ONLY_ADMIN_ERROR, { from, chat })
}
