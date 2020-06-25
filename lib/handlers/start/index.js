const saveUser = require('./saveUser')
const sendMessage = require('./sendMessage')
const typing = require('../../helpers/typing')

module.exports = async ctx => {
  await typing(ctx)
  await saveUser(ctx)
  await sendMessage(ctx)
}
