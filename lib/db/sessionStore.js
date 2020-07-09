module.exports = new Map()

module.exports.buildKey = (userId, chatId) => `${userId}::${chatId}`
module.exports.getSessionKey = ctx => ctx.from && ctx.chat && module.exports.buildKey(ctx.from.id, ctx.chat.id)
