const { BotError } = require('../../../helpers/error')
const { UNKNOWN_ERROR } = require('../../../messages/errorMessages')
const addAdmin = require('./addAdmin')
const removeAdmin = require('./removeAdmin')
const typing = require('../../../helpers/typing')
const { ACTION_ADMIN_ADD, ACTION_ADMIN_REMOVE } = require('../../../constants/actions')
const clearSession = require('./clearSession')

module.exports = async ctx => {
  const {
    match,
    chat,
    from,
    message: { text },
  } = ctx
  if (!match || !match.groups || !match.groups.username)
    throw new BotError('Invalid match prop. Not found username', UNKNOWN_ERROR(ctx), { match, chat, from, text })

  await typing(ctx)
  ctx.session.editUsername = match.groups.username
  if (ctx.session.typeEdit === ACTION_ADMIN_ADD) return addAdmin(ctx)
  if (ctx.session.typeEdit === ACTION_ADMIN_REMOVE) return removeAdmin(ctx)
  clearSession(ctx)

  throw new BotError('Invalid session.typeEdit', UNKNOWN_ERROR(ctx), {
    chat,
    from,
    text,
    session: { ...ctx.session },
  })
}
