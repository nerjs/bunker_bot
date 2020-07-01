const { SCENE_ADMIN_EDIT } = require('../../../constants/scenes')

module.exports = async ctx => {
  const {
    callbackQuery: {
      data,
      message: { text },
    },
  } = ctx

  ctx.session.typeEdit = data

  await ctx.editMessageText(text)
  ctx.scene.enter(SCENE_ADMIN_EDIT)
}
