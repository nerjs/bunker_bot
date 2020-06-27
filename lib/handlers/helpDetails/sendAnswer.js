const buildKeyboard = require('../help/buildKeyboard')
const { isAdmin } = require('../../helpers/access')
const { COMMAND_HELP_ADMIN } = require('../../constants/commands')

module.exports = async (ctx, getMessage, exclude) => {
  const admin = await isAdmin(ctx)
  const kbExclude = [exclude]
  if (!admin) kbExclude.push(COMMAND_HELP_ADMIN)

  if (ctx.callbackQuery) {
    await ctx.editMessageText(getMessage(), {
      parse_mode: 'Markdown',
      reply_markup: buildKeyboard(kbExclude),
    })
  } else {
    ctx.replyWithMarkdown(getMessage(), {
      reply_markup: buildKeyboard(kbExclude),
    })
  }
}
