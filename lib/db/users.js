const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },
    chatId: {
      type: Number,
    },
    displayName: String,
    username: String,
    isAdmin: Boolean,
  },
  {
    timestamps: true,
  },
)

module.exports = model('User', schema)
