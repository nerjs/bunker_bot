const getText = require('../../messages/admin/leaveAdminPanel')
const { coreKeyboard } = require('../../keyboards')
const { MLC_HOME } = require('../../constants/mlc')

module.exports = async ctx => {
  if (ctx.message && MLC_HOME.is(ctx.message.text)) {
    await ctx.reply(getText(ctx), coreKeyboard(ctx).extra())
  }
}
