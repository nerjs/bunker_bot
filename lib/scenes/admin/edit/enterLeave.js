const { inputHelperText, wrongInputText } = require('./messages')

exports.editEnter = async ctx => {
  if (!ctx.callbackQuery) return ctx.scene.parent()
  ctx.scene.state.editAdmin = {
    data: ctx.callbackQuery.data,
  }
  await ctx.editMessageReplyMarkup()
}

exports.editLeave = async ctx => {
  delete ctx.scene.state.editAdmin
}

exports.wrongName = async (ctx, next) => {
  if (ctx.scene.state.editAdmin.username) return next(ctx)
  await ctx.reply(wrongInputText(ctx))
  await ctx.reply(inputHelperText(ctx))
}
