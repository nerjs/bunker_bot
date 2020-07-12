const { model } = require('mongoose')
const schema = require('./schema')
const FeatureClass = require('./class')

schema.loadClass(FeatureClass)

module.exports = model('Feature', schema)
