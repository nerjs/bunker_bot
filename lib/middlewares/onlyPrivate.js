const { ONLY_PRIVATE_ERROR, FORBIDDEN } = require('../constants/messages')
const { BotError, WitReplyBotError } = require('../helpers/error')
const { isPrivate, isMe } = require('../helpers/access')

module.exports = (ctx, next) => {
  if (isPrivate(ctx)) return next(ctx)
  if (isMe(ctx)) throw new WitReplyBotError(FORBIDDEN, ONLY_PRIVATE_ERROR)
}
