const { Telegraf, session, Stage, Markup, Composer } = require('telegraf')

const IS_MODIFIED = Symbol('Is modified trigger')

const noopMiddleware = (ctx, next) => next(ctx)

const modify = fn => {
  return function(trigger, ...middlewares) {
    if (!trigger || !trigger[IS_MODIFIED]) return fn.apply(this, [trigger, ...middlewares])

    return fn.apply(this, [trigger.regexp || `${trigger}`, trigger.middleware || noopMiddleware, ...middlewares])
  }
}

Markup.prototype.concat = function(markup) {
  if (!(markup instanceof Markup)) return this
  Object.keys(markup).forEach(key => {
    this[key] = markup[key]
  })
  return this
}

Composer.prototype.hears = modify(Composer.prototype.hears)
Composer.prototype.action = modify(Composer.prototype.action)

exports.IS_MODIFIED = IS_MODIFIED
