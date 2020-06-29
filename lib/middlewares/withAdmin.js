const { isAdmin } = require('../helpers/access')

module.exports = async (ctx, next) => {
  const admin = await isAdmin(ctx)

  ctx.isAdmin = !!admin

  if (ctx.isAdmin) {
    ctx.from.isAdmin = !!admin
    ctx.from.canEditAdmins = !!admin.canEditAdmins
    ctx.__admin = admin
  }

  return next(ctx)
}
