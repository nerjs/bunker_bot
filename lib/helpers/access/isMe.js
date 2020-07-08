const isPrivate = require('./isPrivate')
const { MENTION, COMMAND } = require('../../constants/types')

module.exports = ctx => {
  if (isPrivate(ctx)) return true
  console.log(ctx)
  console.log(ctx.message)
  if (ctx.message && ctx.startPayload) {
    const { entities, text } = ctx.message
    const { username } = ctx.botInfo

    if (!Array.isArray(entities) || !text) return false

    return (
      entities.some(
        ({ offset, length, type }) => type === MENTION && new RegExp(`^@${username}$`).test(text.substr(offset, length)),
      ) ||
      (entities.some(({ type }) => type === COMMAND) && ctx.startPayload === username)
    )
  }
}
