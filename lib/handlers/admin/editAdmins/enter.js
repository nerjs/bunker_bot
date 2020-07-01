const { Markup } = require('telegraf')
const { inputHelperText } = require('../../../messages/admin/editAdmin')
const { COMMAND_BACK_TEXT } = require('../../../messages/commands')

module.exports = async ctx => {
  await ctx.reply(inputHelperText(ctx), {
    reply_markup: Markup.keyboard([COMMAND_BACK_TEXT(ctx)]).resize(),
  })
}
