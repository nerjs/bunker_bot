const adminList = require('../adminList')
const {
  inputHelperText,
  youAddedToAdmins,
  youRemovedFromAdmins,
  successAddAdmin,
  successRemoveAdmin,
} = require('./messages')
const { ACTION_CANCEL_TEXT, ACTION_OK_TEXT } = require('../../common/messages')
const typing = require('../../../helpers/typing')
const { User, sessionStore } = require('../../../db')
const { ACTION_ADMIN_ADD, ACTION_ADMIN_REMOVE } = require('../action')
const { BotError } = require('../../../helpers/error')
const { UNKNOWN_ERROR } = require('../../../messages/errorMessages')

const postHandler = async (ctx, selfMessage, targetMessage, user) => {
  const { id, chatId, username } = user
  await ctx.reply(selfMessage(ctx, { username }))

  // TODO: сделать более удобное обновление сессии
  const targetSession = await sessionStore.get(sessionStore.buildKey(id, chatId))
  if (targetSession && targetSession.session) {
    delete targetSession.session.user
    await sessionStore.set(sessionStore.buildKey(id, chatId), targetSession)
  }
  await ctx.telegram.sendMessage(chatId, targetMessage(ctx, { username: ctx.user.username }))
}

const preHandler = async (ctx, action) => {
  await typing(ctx)
  await ctx.answerCbQuery(action(ctx))
  await ctx.editMessageReplyMarkup()
}

exports.confirmEdit = async ctx => {
  await preHandler(ctx, ACTION_OK_TEXT)
  const { userId, data } = ctx.scene.state.editAdmin

  const user = await User.findOneAndUpdate({ id: userId }, { isAdmin: data === ACTION_ADMIN_ADD }, { new: true })

  if (!user) throw new BotError('Error edit admin list', UNKNOWN_ERROR(ctx), { userId, data })

  await postHandler(
    ctx,
    data === ACTION_ADMIN_ADD ? successAddAdmin : successRemoveAdmin,
    data === ACTION_ADMIN_ADD ? youAddedToAdmins : youRemovedFromAdmins,
    user,
  )

  await ctx.scene.back()
}

exports.cancelEdit = async ctx => {
  await preHandler(ctx, ACTION_CANCEL_TEXT)
  delete ctx.scene.state.editAdmin.userId
  await ctx.reply(inputHelperText(ctx))
}
