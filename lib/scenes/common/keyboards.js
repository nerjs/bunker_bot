const { Markup } = require('telegraf')
const { COMMAND_BACK_TEXT } = require('./messages')

exports.backKeyboard = ctx => Markup.keyboard([Markup.button(COMMAND_BACK_TEXT(ctx))]).resize()
