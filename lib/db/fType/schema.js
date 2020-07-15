const { Schema } = require('mongoose')
const { fieldSchema, fieldEnumRandSchema, fieldNumberRandSchema, fieldIsRandSchema } = require('./fields')
const { NUMBER_RAND, ENUM_RAND, IS_RAND } = require('./types')

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-Zа-яэА-ЯЭ0-9-_\s]+$/,
  },
  description: {
    type: String,
  },
  help: {
    type: String,
  },
  isDraft: Boolean,
  fields: [fieldSchema],
})

const fieldsDoc = schema.path('fields')
fieldsDoc.discriminator(NUMBER_RAND, fieldNumberRandSchema)
fieldsDoc.discriminator(ENUM_RAND, fieldEnumRandSchema)
fieldsDoc.discriminator(IS_RAND, fieldIsRandSchema)

module.exports = schema
