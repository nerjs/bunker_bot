const bot = require('../../bot')

module.exports = (matched, canEmpty) => {
  if (!matched) return !!canEmpty

  const botName =
    typeof matched === 'string' ? matched : Array.isArray(matched) && matched.groups ? matched.groups.botName : null

  if (!botName) return !!canEmpty

  return botName === (bot.botInfo && bot.botInfo.username)
}
