const { Markup } = require('telegraf')
const { COMMAND_BACK_TEXT } = require('../messages/commands')

module.exports = ctx => Markup.keyboard([COMMAND_BACK_TEXT(ctx)]).resize()
