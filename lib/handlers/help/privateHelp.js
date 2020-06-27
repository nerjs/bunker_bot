const { isAdmin } = require('../../helpers/access')
const textHelp = require('../../messages/help/core')
const buildKeyboard = require('./buildKeyboard')
const { COMMAND_HELP, COMMAND_HELP_ADMIN } = require('../../constants/commands')

module.exports = async ctx => {
  const exclude = [COMMAND_HELP]
  if (!(await isAdmin(ctx))) exclude.push(COMMAND_HELP_ADMIN)

  ctx.replyWithMarkdown(textHelp(), {
    reply_markup: buildKeyboard(exclude),
  })
}
