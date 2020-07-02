const { Admin, User } = require('../../../db')
const { BotError } = require('../../../helpers/error')
const typing = require('../../../helpers/typing')
const { COMMAND_CANCEL_TEXT } = require('../../../messages/commands')
const { UNKNOWN_ERROR } = require('../../../messages/errorMessages')
const { SCENE_ADMIN_PANEL } = require('../../../constants/scenes')
const { ACTION_ADMIN_REMOVE, ACTION_ADMIN_ADD, ACTION_ADMIN_EDIT_CONFIRM_S } = require('../../../constants/actions')
const {
  youAddedToAdmins,
  youRemovedFromAdmins,
  successAddAdmin,
  successRemoveAdmin,
} = require('../../../messages/admin/editAdmin')
const showAdminList = require('../showAdminList')
const clearSession = require('./clearSession')

const getUser = async username => {
  const user = await User.findOne({ username })
  if (!user) throw new BotError('User not found!', UNKNOWN_ERROR(), { username, canEdit })

  return user
}

const addHandler = async (username, canEdit) => {
  const { displayName, id, chatId } = await getUser(username)
  await Admin.create({ username, id, displayName, canEditAdmins: !!canEdit })

  return {
    userId: id,
    chatId,
    message: successAddAdmin,
    userMessage: youAddedToAdmins,
  }
}

const removeHandler = async username => {
  const { id, chatId } = await getUser(username)
  await Admin.findOneAndRemove({ username })
  return { userId: id, chatId, message: successRemoveAdmin, userMessage: youRemovedFromAdmins }
}

module.exports = async ctx => {
  await typing(ctx)
  // TODO: Убрать инлайн клавиатуру
  const {
    session: { typeEdit, editUsername },
    callbackQuery: {
      data,
      message: { text },
    },
    from,
  } = ctx

  if ([typeEdit, editUsername, data].some(f => !f))
    throw new BotError('Fields is incorrect', UNKNOWN_ERROR(ctx), { typeEdit, editUsername, data, text })

  const { userId, chatId, message, userMessage } = await (async () => {
    if (typeEdit === ACTION_ADMIN_ADD) return addHandler(editUsername, data === ACTION_ADMIN_EDIT_CONFIRM_S)
    if (typeEdit === ACTION_ADMIN_REMOVE) return removeHandler(editUsername)

    throw new BotError('Unknown action', UNKNOWN_ERROR(ctx), { typeEdit, editUsername, data, text })
  })()

  await ctx.reply(message(ctx, { username: editUsername }))

  await ctx.telegram.sendMessage(chatId, userMessage(ctx, { username: from.username })) // TODO: обновить клавиатуру

  clearSession(ctx)
  ctx.scene.enter(SCENE_ADMIN_PANEL)
  await showAdminList(ctx) // TODO: Убрать лишние сообщения
}
