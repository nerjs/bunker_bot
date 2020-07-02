const getText = require('../../messages/admin/enterAdminPanel')
const { adminKeyboard } = require('../../keyboards')

module.exports = async ctx => {
  ctx.reply(getText(ctx), (await adminKeyboard(ctx)).extra())
}
