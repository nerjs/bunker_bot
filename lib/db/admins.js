const { Schema, model } = require('mongoose')

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  id: {
    type: Number,
    required: true,
    index: true,
    unique: true,
  },
})

module.exports = model('Admin', schema)
