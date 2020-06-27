const textHelp = require('../../messages/help/core')
const buildKeyboard = require('./buildKeyboard')
const { COMMAND_HELP, COMMAND_HELP_ADMIN } = require('../../constants/commands')

module.exports = async ctx => {
  ctx.replyWithMarkdown(textHelp(), {
    reply_markup: buildKeyboard([COMMAND_HELP, COMMAND_HELP_ADMIN]),
  })
}
