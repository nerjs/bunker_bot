const { Markup } = require('telegraf')
const typing = require('../../helpers/typing')
const { User } = require('../../db')
const { ACTION_ADMIN_ADD, ACTION_ADMIN_REMOVE } = require('./action')
const { ACTION_ADMIN_ADD_TEXT, ACTION_ADMIN_REMOVE_TEXT } = require('./messages')

module.exports = async ctx => {
  await typing(ctx)
  const admins = await User.find({ isAdmin: true })

  let msg = admins
    .map(
      ({ username, displayName, id }) =>
        ` ${id === ctx.user.id ? '☑️ ' : ' '}[@${username}] ___${(displayName || '').trim()}___ `,
    )
    .join('\n')

  const buttons = [[ACTION_ADMIN_ADD, ACTION_ADMIN_ADD_TEXT]]

  if (admins.length > 1) buttons.push([ACTION_ADMIN_REMOVE, ACTION_ADMIN_REMOVE_TEXT])

  await ctx.replyWithMarkdown(
    msg,
    Markup.inlineKeyboard(buttons.map(([action, text]) => Markup.callbackButton(text(ctx), action))).extra(),
  )
}
