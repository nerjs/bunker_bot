const buildKeyboard = require('./buildKeyboard')
const { isAdmin, isPrivate, isGroup } = require('../../helpers/access')
const { COMMAND_HELP_ADMIN } = require('../../constants/commands')
const { FORBIDDEN_MESSAGE_ERROR } = require('../../messages/errorMessages')

const answerText = async (ctx, message, reply_markup) => {
  const options = { reply_markup }

  if (isGroup(ctx)) {
    options.reply_to_message_id = ctx.message.message_id
  }

  await ctx.replyWithMarkdown(message, options)
}

const answerCbQuery = async (ctx, message, keyboard) => {
  if (
    isGroup(ctx) &&
    ctx.callbackQuery.message.reply_to_message &&
    ctx.callbackQuery.message.reply_to_message.from &&
    ctx.callbackQuery.message.reply_to_message.from.id !== ctx.from.id
  ) {
    await ctx.answerCbQuery(FORBIDDEN_MESSAGE_ERROR, false, {
      cache_time: 10,
    })

    return
  }

  await ctx.editMessageText(message, {
    parse_mode: 'Markdown',
    reply_markup: keyboard,
  })
}

module.exports = async (ctx, getMessage, exclude) => {
  if (!Array.isArray(exclude)) return module.exports(ctx, getMessage, [exclude])

  const kbExclude = [...exclude]

  if (!isPrivate(ctx) || !(await isAdmin(ctx))) kbExclude.push(COMMAND_HELP_ADMIN)

  const handler = ctx.callbackQuery ? answerCbQuery : answerText

  await handler(ctx, getMessage(), buildKeyboard(kbExclude))
}
