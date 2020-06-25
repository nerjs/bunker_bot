const { isAdmin } = require('../helpers/access')

module.exports = async (ctx, next) => {
  const admin = await isAdmin(ctx)

  ctx.isAdmin = !!admin
  return next(ctx)
}
