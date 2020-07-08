const logger = require('nlogs')(module)
const { rootCommands } = require('./commands')
const { startMessage } = require('./messages')
const keyboard = require('./keyboard')
const { User } = require('../../db')
const buildDisplayName = require('../../helpers/buildDisplayName')

const { FIRST_ADMIN } = process.env

module.exports = async ctx => {
  if (!ctx.user) {
    const { from, chat } = ctx
    ctx.user = {
      id: from.id,
      chatId: chat.id,
      username: from.username,
      displayName: buildDisplayName(from),
      isAdmin: FIRST_ADMIN && FIRST_ADMIN === from.username,
    }
  }
  await ctx.setMyCommands(rootCommands(ctx))
  await ctx.replyWithMarkdown(startMessage(ctx), keyboard(ctx).extra())
}
