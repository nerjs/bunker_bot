const { Schema } = require('mongoose')
const { NUMBER_RAND, ENUM_RAND, IS_RAND } = require('./types')

exports.fieldSchema = new Schema(
  {
    kind: {
      type: String,
      required: true,
      enum: [NUMBER_RAND, ENUM_RAND, IS_RAND],
    },
    title: {
      type: String,
      max: 10,
    },
  },
  {
    discriminatorKey: 'kind',
  },
)

exports.fieldNumberRandSchema = new Schema({
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
    validate: [
      function(value) {
        return value >= this.min
      },
      'the field MAX cannot be less than the field MIN',
    ],
  },
})

exports.fieldEnumRandSchema = new Schema({
  row: {
    type: [String],
    required: true,
    default: undefined,
  },
  chance: {
    type: [Number],
    default: undefined,
    validate: [
      function(arr) {
        console.log('validate', arr, this.row)
        return arr.length === this.row.length && arr.reduce((a, b) => a + b, 0) === 100
      },
      'The chance must be in the same amount as the row and in total equal to 100',
    ],
  },
})

exports.fieldIsRandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  chance: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
})
