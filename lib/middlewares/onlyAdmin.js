const { ForbiddenBotError } = require('../helpers/error')

module.exports = async (ctx, next) => {
  if (ctx.isAdmin) return next(ctx)
  throw new ForbiddenBotError(ctx)
}
