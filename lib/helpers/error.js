const { FORBIDDEN, FORBIDDEN_MESSAGE_ERROR } = require('../messages/errorMessages')

class BotError extends Error {
  constructor(errMsg, msg, details) {
    const params = {}

    if (errMsg instanceof Error) {
      params.message = errMsg.message
      params.originalError = errMsg
      Object.keys(errMsg).forEach(key => (params[key] = errMsg[key]))
    }

    super(params.message || (typeof errMsg === 'string' && errMsg) || msg || 'Unknown error!')

    if (msg) this.clientMessage = msg

    Object.keys(params).forEach(key => {
      this[key] = params[key]
    })

    if (details && typeof details === 'object') {
      this.details = { ...details }
    }

    this.name = 'BotError'
  }

  static getSelf(error) {
    if (error instanceof BotError) return error
    return new this(error)
  }
}

class SilentBotError extends BotError {
  constructor(...args) {
    super(...args)

    this.silent = true
    this.name = 'SilentBotError'
  }
}

class WitReplyBotError extends BotError {
  constructor(eMsg, msg, details) {
    super(eMsg, msg, details)

    this.name = 'WitReplyBotError'
  }
}

class ForbiddenBotError extends BotError {
  constructor(ctx) {
    const { chat, from } = ctx

    super(FORBIDDEN, FORBIDDEN_MESSAGE_ERROR(ctx), {
      from,
      chat,
    })

    this.name = 'ForbiddenBotError'
  }
}

exports.BotError = BotError
exports.SilentBotError = SilentBotError
exports.WitReplyBotError = WitReplyBotError
exports.ForbiddenBotError = ForbiddenBotError
