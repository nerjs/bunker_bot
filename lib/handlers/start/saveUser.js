const logger = require('nlogs')(module)
const { User } = require('../../db')

module.exports = async ({
  message: {
    chat,
    from: { id, username, displayName },
  },
}) => {
  const user = await User.findOne({ id })

  if (!user) {
    await User.create({ id: id, chatId: chat.id, username: username, displayName: displayName })
  } else if (user.username !== username || user.displayName !== displayName || user.chatId !== chat.id) {
    user.username = username
    user.displayName = displayName
    user.chatId = chat.id

    await user.save()
  }
}
