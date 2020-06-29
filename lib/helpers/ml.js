const logger = require('nlogs')(module)
const { LANGS, DEFAULT_LANG } = require('../constants/langs')
const isContext = require('./isContext')

const IS_ML = Symbol('Is multy languages')

const ARR_LANGS = Object.keys(LANGS).map(key => LANGS[key])

const createML = langSchema => {
  const mlGetter = (lang, ctx) => {
    if (isContext(lang)) return mlGetter(lang.from.language_code, lang)
    const result = langSchema[lang] || langSchema[DEFAULT_LANG]
    return typeof result === 'function' ? result(ctx) : result
  }

  mlGetter.get = mlGetter
  mlGetter.languages = langSchema
  mlGetter.toString = () => mlGetter(DEFAULT_LANG)
  mlGetter[IS_ML] = true

  return mlGetter
}

const ml = _langSchema => {
  if (!_langSchema) throw new Error('Required langSchema argument')
  if (typeof _langSchema === 'string' || (typeof _langSchema === 'function' && !_langSchema[IS_ML]))
    return ml({ [DEFAULT_LANG]: _langSchema })
  if (!_langSchema || !(typeof _langSchema === 'object' || typeof _langSchema === 'function'))
    throw new Error(`Wrong Arguments: ${JSON.stringify(_langSchema)}`)

  if (_langSchema[IS_ML]) return ml(_langSchema.languages)

  const langSchema = { ..._langSchema }

  Object.keys({ ...langSchema }).forEach(key => {
    if (!ARR_LANGS.includes(key)) {
      logger.warn(`Language ${key} not allowed for installation. [${key}: ${langSchema[key]}]`)
      delete langSchema[key]
    }
  })

  if (!Object.keys(langSchema).length) throw new Error(`Languages not found`)
  if (!langSchema[DEFAULT_LANG]) throw new Error(`Not required language: ${DEFAULT_LANG}`)

  return createML(langSchema)
}

exports = module.exports = ml
exports.createML = ml
exports.IS_ML = IS_ML
exports.ARR_LANGS = ARR_LANGS
