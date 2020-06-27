const bot = require('../../bot')
const isPrivate = require('./isPrivate')
const { MENTION } = require('../../constants/types')

module.exports = ({ message, botInfo: { username } }) => {
  if (isPrivate(message)) return true
  const { entities, text } = message

  if (!Array.isArray(entities) || !text) return false

  return entities.some(
    ({ offset, length, type }) => type === MENTION && new RegExp(`^@${username}$`).test(text.substr(offset, length)),
  )
}
