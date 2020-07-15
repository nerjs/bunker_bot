/**
 * Multi values actions
 */
const { IS_MODIFIED } = require('../bot')

const MVA = name => {
  if (!name || typeof name !== 'string') throw new Error('Incorrect argument MVA() name.')

  const mvaGetter = value => `${name}:::${value}`
  mvaGetter.regexp = new RegExp(`^${name}:::(?<mva>\\w+)$`)
  mvaGetter.middleware = (ctx, next) => {
    if (!ctx.callbackQuery || !ctx.match || !ctx.match.groups || !ctx.match.groups.mva) return
    Object.defineProperty(ctx, 'mvaValue', {
      get() {
        return ctx.match.groups.mva
      },
    })
    return next(ctx)
  }
  mvaGetter[IS_MODIFIED] = true

  return mvaGetter
}

module.exports = MVA
