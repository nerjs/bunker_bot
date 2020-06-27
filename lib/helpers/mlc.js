const { BotError } = require('./error')
const { DEFAULT_LANG, LANGS } = require('../constants/langs')
const { createML } = require('./ml')
const { UNKNOWN_ERROR } = require('../messages/errorMessages')
const IS_MLC = Symbol('Is multy languages commands')

const createMLC = (langSchema = {}) => {
  const mlcGetter = createML(langSchema)

  mlcGetter.regexp = new RegExp(
    `^(${Object.keys(langSchema)
      .map(key => `(?<${key}>${langSchema[key]})`)
      .join('|')})$`,
  )

  mlcGetter.middleware = (ctx, next) => {
    const userLang = ctx.from.language_code || DEFAULT_LANG

    if (!ctx.match || !ctx.match.groups)
      throw new BotError('Match info not found', UNKNOWN_ERROR, { from: ctx.from, match: ctx.match })

    if (ctx.match[userLang] || (!LANGS.includes(userLang) && ctx.match[DEFAULT_LANG])) return next(ctx)
  }

  mlcGetter[IS_MLC] = true

  return mlcGetter
}

exports = module.exports = createMLC
exports.IS_MLC = IS_MLC
