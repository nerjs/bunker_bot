const getText = require('../../messages/admin/leaveAdminPanel')
const buildStartMarkup = require('../start/buildMarkup')
const { MLC_HOME } = require('../../constants/mlc')

module.exports = async ctx => {
  if (ctx.message && MLC_HOME.is(ctx.message.text)) {
    await ctx.reply(getText(ctx), { reply_markup: buildStartMarkup(ctx) })
  }
}
