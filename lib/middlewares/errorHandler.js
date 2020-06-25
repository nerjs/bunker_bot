const logger = require('nlogs')(module)
const sleep = require('helpers-promise/sleep')
const { BotError, SilentBotError, WitReplyBotError } = require('../helpers/error')

module.exports = async (ctx, next) => {
  try {
    await next(ctx)
  } catch (_error) {
    const error = SilentBotError.getSelf(_error)
    logger.error(error)
    if (error.silent) return
    await sleep(1000)

    const message = error.clientMessage || error.message
    const options = {}

    if (error instanceof WitReplyBotError) {
      options.reply_to_message_id = ctx.message.message_id
    }

    try {
      ctx.reply(message, options)
    } catch (e) {
      logger.error(e)
    }
  }
}
