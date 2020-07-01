const { Markup } = require('telegraf')
const { Admin } = require('../../db')
const { canEditAdmins } = require('../../helpers/access')
const typing = require('../../helpers/typing')
const { COMMAND_ADMIN_ADD_TEXT, COMMAND_ADMIN_REMOVE_TEXT } = require('../../messages/commands')
const { ACTION_ADMIN_ADD, ACTION_ADMIN_REMOVE } = require('../../constants/actions')

module.exports = async ctx => {
  await typing(ctx)
  const admins = await Admin.find()

  let msg = admins
    .map(
      ({ username, displayName, id }) => ` ${id === ctx.from.id ? '☑️ ' : ' '}[@${username}] ___${displayName.trim()}___ `,
    )
    .join('\n')

  const options = {}

  if (canEditAdmins(ctx)) {
    const buttons = [Markup.callbackButton(COMMAND_ADMIN_ADD_TEXT(ctx), ACTION_ADMIN_ADD)]

    if (admins.length > 1) buttons.push(Markup.callbackButton(COMMAND_ADMIN_REMOVE_TEXT(ctx), ACTION_ADMIN_REMOVE))

    options.reply_markup = Markup.inlineKeyboard(buttons)
  }

  await ctx.replyWithMarkdown(msg, options)
}
