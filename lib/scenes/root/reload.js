const { reloadMessage } = require('./messages')

module.exports = async ctx => {
  await ctx.scene.sendHeaders(reloadMessage(ctx))
}
