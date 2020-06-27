const buildKeyboard = require('../help/buildKeyboard')
const getText = require('../../messages/help/bot')
const { COMMAND_HELP_ADMIN, COMMAND_HELP_BOT } = require('../../constants/commands')

module.exports = async ctx => {
  const kbExclude = [COMMAND_HELP_BOT]
  if (!ctx.isAdmin) kbExclude.push(COMMAND_HELP_ADMIN)
  if (ctx.callbackQuery) {
    await ctx.editMessageText(getText(), {
      parse_mode: 'Markdown',
      reply_markup: buildKeyboard(kbExclude),
    })
  } else {
    ctx.replyWithMarkdown(getText(), {
      reply_markup: buildKeyboard(kbExclude),
    })
  }
}
