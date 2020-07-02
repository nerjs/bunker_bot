const { Markup } = require('telegraf')
const { canEditAdmins } = require('../helpers/access')
const { COMMAND_ADMIN_ADD_TEXT, COMMAND_ADMIN_REMOVE_TEXT } = require('../messages/commands')
const { ACTION_ADMIN_ADD, ACTION_ADMIN_REMOVE } = require('../constants/actions')

module.exports = async (ctx, adminLength) => {
  const markup = new Markup()

  if (canEditAdmins(ctx)) {
    const buttons = [Markup.callbackButton(COMMAND_ADMIN_ADD_TEXT(ctx), ACTION_ADMIN_ADD)]

    if (adminLength > 1) buttons.push(Markup.callbackButton(COMMAND_ADMIN_REMOVE_TEXT(ctx), ACTION_ADMIN_REMOVE))

    markup.inlineKeyboard(buttons)
  }

  return markup
}
