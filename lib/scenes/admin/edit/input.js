const { inlineConfirm } = require('../../common/inlineKeyboards')
const {
  inputHelperText,
  wrongInputText,
  userNotInstallBot,
  userAlreadyAdmin,
  userNotAdmin,
  confirmAddAdmin,
  confirmRemoveAdmin,
} = require('./messages')
const { User } = require('../../../db')
const { ACTION_ADMIN_ADD, ACTION_ADMIN_REMOVE } = require('../action')

const replyConfirm = async (ctx, message, user) => {
  ctx.scene.state.editAdmin.userId = user.id
  await ctx.reply(message(ctx, { username: user.username }), inlineConfirm(ctx).extra())
}

const reply = async (ctx, message, username) => {
  await ctx.reply(message(ctx, { username }))
  await ctx.reply(inputHelperText(ctx))
}

const addAdmin = async (ctx, user, username) => {
  if (!user) return reply(ctx, userNotInstallBot, username)
  if (user.isAdmin) return reply(ctx, userAlreadyAdmin, username)
  return replyConfirm(ctx, confirmAddAdmin, user)
}

const removeAdmin = async (ctx, user, username) => {
  if (!user) return reply(ctx, userNotInstallBot, username)
  if (!user.isAdmin) return reply(ctx, userNotAdmin, username)
  return replyConfirm(ctx, confirmRemoveAdmin, user)
}

module.exports = async (ctx, next) => {
  if (
    !ctx.match ||
    !ctx.match.groups ||
    !ctx.match.groups.username ||
    !ctx.scene.state.editAdmin ||
    ctx.scene.state.editAdmin.userId
  )
    return next(ctx)

  const { username } = ctx.match.groups
  const { data } = ctx.scene.state.editAdmin
  const user = await User.findOne({ username })

  if (data === ACTION_ADMIN_ADD) return addAdmin(ctx, user, username)
  if (data === ACTION_ADMIN_REMOVE) return removeAdmin(ctx, user, username)
  await reply(ctx, wrongInputText)
}
