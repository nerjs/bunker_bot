const buildMarkup = require('../handlers/start/buildMarkup')
const { NOT_FOUND_CB_QUERY, NOT_FOUND_MESSAGE } = require('../messages/notFoundMessage')

module.exports = async ctx => {
  if (ctx.callbackQuery) {
    console.dir(ctx.callbackQuery, { depth: 5 })
    await ctx.editMessageReplyMarkup()
    await ctx.answerCbQuery(NOT_FOUND_CB_QUERY(ctx), true)
  } else {
    await ctx.reply(NOT_FOUND_MESSAGE(ctx), { reply_markup: buildMarkup(ctx) })
  }
}
