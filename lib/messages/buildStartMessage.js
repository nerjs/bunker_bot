const { COMMAND_ADMIN_DESC, COMMAND_CURRENT_DESC, COMMAND_FOLLOW_DESC, COMMAND_HELP_DESC } = require('../constants/messages')
const { COMMAND_ADMIN, COMMAND_CURRENT, COMMAND_FOLLOW, COMMAND_HELP } = require('../constants/commands')

module.exports = ({ from: { displayName } }, commands) => {
  let msg = `Привет *${displayName}*!`

  msg += '\n\n'

  msg += 'Доступные команды:'

  commands.forEach(({ command, description }) => {
    msg += `\n/${command} - _${description}_`
  })

  return msg
}
