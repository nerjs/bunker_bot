const { NOT_FOUND_CB_QUERY, NOT_FOUND_MESSAGE } = require('../messages/errorMessages')

module.exports = async ctx => {
  if (ctx.callbackQuery) {
    await ctx.answerCbQuery(NOT_FOUND_CB_QUERY(ctx), true)
    await ctx.editMessageReplyMarkup()
  } else {
    await ctx.reply(NOT_FOUND_MESSAGE(ctx))
  }
}
