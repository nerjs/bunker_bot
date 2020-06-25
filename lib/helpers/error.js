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
}

module.exports = BotError
