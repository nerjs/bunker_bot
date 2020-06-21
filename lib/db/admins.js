const { Schema, model } = require('mongoose')

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  tgId: {
    type: Number,
    required: true,
  },
})

module.exports = model('Admin', schema)
