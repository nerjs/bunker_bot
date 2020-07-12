const { Schema, model } = require('mongoose')
const { schema } = require('../users')

const scema = new Schema({
  title: {
    type: String,
    required: true,
  },
})

module.exports = schema
