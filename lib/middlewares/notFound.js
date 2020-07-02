const { coreKeyboard } = require('../keyboards')
const { NOT_FOUND_CB_QUERY, NOT_FOUND_MESSAGE } = require('../messages/notFoundMessage')

module.exports = async ctx => {
  if (ctx.callbackQuery) {
    await ctx.editMessageReplyMarkup()
    await ctx.answerCbQuery(NOT_FOUND_CB_QUERY(ctx), true)
  } else {
    await ctx.reply(NOT_FOUND_MESSAGE(ctx), coreKeyboard(ctx).extra())
  }
}
