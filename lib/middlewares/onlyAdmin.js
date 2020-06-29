const { isAdmin } = require('../helpers/access')
const { ForbiddenBotError } = require('../helpers/error')

module.exports = async (ctx, next) => {
  if (await isAdmin(ctx)) return next(ctx)
  throw new ForbiddenBotError(ctx)
}
