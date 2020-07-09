const logger = require('nlogs')(module)
const sleep = require('helpers-promise/sleep')
const { SilentBotError, WitReplyBotError } = require('../helpers/error')

const standartMessageHandler = async (ctx, error) => {
  if (error.silent) return

  await sleep(1000)

  const message = error.clientMessage || error.message

  const options = {}
  if (error instanceof WitReplyBotError) {
    options.reply_to_message_id = ctx.message.message_id
  }
  await ctx.reply(message, options)
}

const cbQueryHandler = async (ctx, error) => {
  const message = (error.silent && 'Error') || error.clientMessage || error.message
  await ctx.answerCbQuery(message, false, {
    cache_time: 30,
  })
}

module.exports = async (_error, ctx) => {
  const error = SilentBotError.getSelf(_error)
  logger.error(error)

  const handler = ctx.callbackQuery ? cbQueryHandler : standartMessageHandler

  try {
    await handler(ctx, error)
  } catch (e) {
    logger.error(e)
  }
}
