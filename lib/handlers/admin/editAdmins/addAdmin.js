const { Markup } = require('telegraf')
const { Admin, User } = require('../../../db')
const { canEditAdmins } = require('../../../helpers/access')
const { BotError } = require('../../../helpers/error')
const { COMMAND_CANCEL_TEXT, COMMAND_OK_TEXT, COMMAND_ADMIN_CONFIRM_SUPERADMIN_TEXT } = require('../../../messages/commands')
const { UNKNOWN_ERROR } = require('../../../messages/errorMessages')
const { confirmAddAdmin, userAlreadyAdmin, userNotInstallBot } = require('../../../messages/admin/editAdmin')
const {
  ACTION_ADMIN_EDIT_CONFIRM,
  ACTION_ADMIN_EDIT_CONFIRM_S,
  ACTION_ADMIN_EDIT_CANCEL,
} = require('../../../constants/actions')
const enterEditHandler = require('./enter')

const checkNewAdmin = async (ctx, username) => {
  let message
  if (await Admin.exists({ username })) message = userAlreadyAdmin(ctx, { username })
  if (!(await User.exists({ username }))) message = userNotInstallBot(ctx, { username })

  if (message) {
    await ctx.reply(message)
    return false
  }

  return true
}

module.exports = async ctx => {
  if (!ctx.session.editUsername)
    throw new BotError('username not found', UNKNOWN_ERROR(ctx), { session: { ...ctx.session } })
  if (!(await checkNewAdmin(ctx, ctx.session.editUsername))) return enterEditHandler(ctx)

  const keyboard = [
    Markup.callbackButton(COMMAND_OK_TEXT(ctx), ACTION_ADMIN_EDIT_CONFIRM),
    Markup.callbackButton(COMMAND_CANCEL_TEXT(ctx), ACTION_ADMIN_EDIT_CANCEL),
  ]

  if (canEditAdmins(ctx))
    keyboard.splice(1, 0, Markup.callbackButton(COMMAND_ADMIN_CONFIRM_SUPERADMIN_TEXT(ctx), ACTION_ADMIN_EDIT_CONFIRM_S))

  ctx.reply(confirmAddAdmin(ctx, { username: ctx.session.editUsername }), {
    reply_markup: Markup.inlineKeyboard(keyboard),
  })
}
