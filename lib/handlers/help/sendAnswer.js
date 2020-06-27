const buildKeyboard = require('./buildKeyboard')
const { isAdmin, isPrivate } = require('../../helpers/access')
const { COMMAND_HELP_ADMIN } = require('../../constants/commands')

module.exports = async (ctx, getMessage, exclude) => {
  if (!Array.isArray(exclude)) return module.exports(ctx, getMessage, [exclude])

  const kbExclude = [...exclude]

  if (!isPrivate(ctx) || !(await isAdmin(ctx))) kbExclude.push(COMMAND_HELP_ADMIN)

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
