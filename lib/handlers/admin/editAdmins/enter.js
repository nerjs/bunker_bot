const { inputHelperText } = require('../../../messages/admin/editAdmin')
const { backKeyboard } = require('../../../keyboards')

module.exports = async ctx => {
  await ctx.reply(inputHelperText(ctx), backKeyboard(ctx).extra())
}
