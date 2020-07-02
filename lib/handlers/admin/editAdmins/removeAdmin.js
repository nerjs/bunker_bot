const { Admin } = require('../../../db')
const { BotError } = require('../../../helpers/error')
const { UNKNOWN_ERROR } = require('../../../messages/errorMessages')
const { confirmRemoveAdmin, userNotAdmin } = require('../../../messages/admin/editAdmin')
const enterEditHandler = require('./enter')
const { confirmInline } = require('../../../keyboards')

const checkRemoveAdmin = async (ctx, username) => {
  if (!(await Admin.exists({ username }))) {
    await ctx.reply(userNotAdmin(ctx))
    return false
  }

  return true
}

module.exports = async ctx => {
  if (!ctx.session.editUsername)
    throw new BotError('username not found', UNKNOWN_ERROR(ctx), { session: { ...ctx.session } })
  if (!(await checkRemoveAdmin(ctx, ctx.session.editUsername))) return enterEditHandler(ctx)

  ctx.reply(confirmRemoveAdmin(ctx, { username: ctx.session.editUsername }), confirmInline(ctx).extra())
}
