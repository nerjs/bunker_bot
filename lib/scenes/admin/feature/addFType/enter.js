const { addFType } = require('../messages')

module.exports = ctx => {
  if (!ctx.callbackQuery) return
  return ctx.answerCbQuery(addFType(ctx), false, { cache_time: 5 })
}
