const { Markup } = require('telegraf')
const { ACTION_CONFIRM, ACTION_CANCEL } = require('./actions')
const { ACTION_OK_TEXT, ACTION_CANCEL_TEXT } = require('./messages')

exports.inlineConfirm = ctx =>
  Markup.inlineKeyboard(
    [
      [ACTION_CONFIRM, ACTION_OK_TEXT],
      [ACTION_CANCEL, ACTION_CANCEL_TEXT],
    ].map(([action, text]) => Markup.callbackButton(text(ctx), action)),
    { columns: 2 },
  )
