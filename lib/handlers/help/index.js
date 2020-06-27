const getDetails = require('./getDetails')

module.exports = isCommand => async ctx => {
  const detailHandler = getDetails(ctx, isCommand)

  if (detailHandler) return detailHandler(ctx)
}
