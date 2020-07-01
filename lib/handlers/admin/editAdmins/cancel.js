const { COMMAND_CANCEL_TEXT } = require('../../../messages/commands')
const { SCENE_ADMIN_PANEL } = require('../../../constants/scenes')
const showAdminList = require('../showAdminList')
const clearSession = require('./clearSession')

module.exports = async ctx => {
  clearSession(ctx)
  await ctx.answerCbQuery(COMMAND_CANCEL_TEXT(ctx))
  await ctx.editMessageReplyMarkup()
  ctx.scene.enter(SCENE_ADMIN_PANEL)
  await showAdminList(ctx)
}
