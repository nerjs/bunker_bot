const { isAdmin, isPrivate, isGroup } = require('../../helpers/access')
const { ACTION_HELP_ADMIN } = require('../../constants/actions')
const { FORBIDDEN_MESSAGE_ERROR } = require('../../messages/errorMessages')
const { helpInline } = require('../../keyboards')

const answerText = async (ctx, message, exclude) => {
  const options = {}

  if (isGroup(ctx)) {
    options.reply_to_message_id = ctx.message.message_id
  }

  await ctx.replyWithMarkdown(message, helpInline(ctx, exclude).extra(options))
}

const answerCbQuery = async (ctx, message, exclude) => {
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

  await ctx.editMessageText(
    message,
    helpInline(ctx, exclude).extra({
      parse_mode: 'Markdown',
    }),
  )
}

module.exports = async (ctx, getMessage, exclude) => {
  if (!Array.isArray(exclude)) return module.exports(ctx, getMessage, [exclude])

  const kbExclude = [...exclude]

  if (!isPrivate(ctx) || !(await isAdmin(ctx))) kbExclude.push(ACTION_HELP_ADMIN)

  const handler = ctx.callbackQuery ? answerCbQuery : answerText

  await handler(ctx, getMessage(), kbExclude)
}
