const RedisSession = require('telegraf-session-redis')
const { Context } = require('telegraf')

const { REDIS_HOST, REDIS_PORT } = process.env
const TTL = 60 * 60 * 24

const getKey = (userId, chatId) => {
  if (userId instanceof Context) {
    if (!userId.from || !userId.chat) return null
    return getKey(userId.from.id, userId.chat.id)
  }

  return `${userId}::${chatId}`
}

module.exports = new RedisSession({
  store: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
  getSessionKey: getKey,
  ttl: TTL,
})

module.exports.getKey = getKey
