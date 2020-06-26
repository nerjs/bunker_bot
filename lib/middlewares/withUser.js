const logger = require('nlogs')(module)
const { User } = require('../db')

module.exports = async (ctx, next) => {
  const {
    message: {
      chat,
      from: { id, username, displayName },
    },
  } = ctx

  let currentUser = await User.findOne({ id })

  if (!currentUser) {
    logger.debug('New user:', { userId: id, username })

    currentUser = await User.create({ id: id, chatId: chat.id, username: username, displayName: displayName })
  } else if (
    currentUser.username !== username ||
    currentUser.displayName !== displayName ||
    currentUser.chatId !== chat.id
  ) {
    logger.debug(
      'Update user fields:',
      Object.entries({
        username: [currentUser.username, username],
        displayName: [currentUser.displayName, displayName],
        chatId: [currentUser.chatId, chat.id],
      }).reduce((fields, [fieldName, values]) => {
        if (values[0] !== values[1]) fields[fieldName] = values
        return fields
      }, {}),
    )

    currentUser.username = username
    currentUser.displayName = displayName
    currentUser.chatId = chat.id

    await currentUser.save()
  }

  ctx.currentUser = currentUser

  await next(ctx)
}
