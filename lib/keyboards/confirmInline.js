const { Markup } = require('telegraf')
const { COMMAND_CANCEL_TEXT, COMMAND_OK_TEXT } = require('../messages/commands')
const { ACTION_CONFIRM, ACTION_CANCEL } = require('../constants/actions')

module.exports = (ctx, { text, action } = {}) => {
  const keyboard = [
    Markup.callbackButton(COMMAND_OK_TEXT(ctx), ACTION_CONFIRM),
    Markup.callbackButton(COMMAND_CANCEL_TEXT(ctx), ACTION_CANCEL),
  ]

  if (text && action) keyboard.splice(1, 0, Markup.callbackButton(text, action))

  return Markup.inlineKeyboard(keyboard)
}
