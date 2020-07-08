const logger = require('nlogs')(module)
const { rootCommands } = require('./commands')
const { startMessage } = require('./messages')
const keyboard = require('./keyboard')

module.exports = async ctx => {
  if (!ctx.user) {
    logger.debug('Create user')
  }
  await ctx.setMyCommands(rootCommands(ctx))
  await ctx.replyWithMarkdown(startMessage(ctx), keyboard(ctx).extra())
}
