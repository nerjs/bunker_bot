const isGroup = require('./isGroup')
const isPrivate = require('./isPrivate')
const isMe = require('./isMe')
const BotError = require('../error')
const { ONLY_ME_ERROR } = require('../../messages/errorMessages')

module.exports = (msg, matched, canEmpty) => {
  console.log([isPrivate(msg), isGroup(msg), isMe(matched, canEmpty)])
  if (isPrivate(msg) || (isGroup(msg) && isMe(matched, canEmpty))) return

  throw new BotError('Forbidden', ONLY_ME_ERROR, msg)
}
