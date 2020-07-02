const { Markup } = require('telegraf')
const { COMMAND_ADMIN_ADD_TEXT, COMMAND_ADMIN_REMOVE_TEXT } = require('../messages/commands')
const { ACTION_ADMIN_ADD, ACTION_ADMIN_REMOVE } = require('../constants/actions')

module.exports = (ctx, adminLength, canEditAdmins) => {
  const markup = new Markup()
  console.log(ctx)
  if (canEditAdmins) {
    const buttons = [Markup.callbackButton(COMMAND_ADMIN_ADD_TEXT(ctx), ACTION_ADMIN_ADD)]

    if (adminLength > 1) buttons.push(Markup.callbackButton(COMMAND_ADMIN_REMOVE_TEXT(ctx), ACTION_ADMIN_REMOVE))

    markup.inlineKeyboard(buttons)
  }

  return markup
}
