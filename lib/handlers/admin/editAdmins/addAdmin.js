const { Admin, User } = require('../../../db')
const { BotError } = require('../../../helpers/error')
const { UNKNOWN_ERROR } = require('../../../messages/errorMessages')
const { confirmAddAdmin, userAlreadyAdmin, userNotInstallBot } = require('../../../messages/admin/editAdmin')
const enterEditHandler = require('./enter')
const { addAdminInline } = require('../../../keyboards')

const checkNewAdmin = async (ctx, username) => {
  let message
  if (await Admin.exists({ username })) message = userAlreadyAdmin(ctx, { username })
  if (!(await User.exists({ username }))) message = userNotInstallBot(ctx, { username })

  if (message) {
    await ctx.reply(message)
    return false
  }

  return true
}

module.exports = async ctx => {
  if (!ctx.session.editUsername)
    throw new BotError('username not found', UNKNOWN_ERROR(ctx), { session: { ...ctx.session } })
  if (!(await checkNewAdmin(ctx, ctx.session.editUsername))) return enterEditHandler(ctx)
  ctx.reply(confirmAddAdmin(ctx, { username: ctx.session.editUsername }), addAdminInline(ctx).extra())
}
