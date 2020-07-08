const {
  COMMAND_HELP,
  COMMAND_ADMIN,
  COMMAND_HELP_ADMIN,
  COMMAND_HELP_BOT,
  COMMAND_HELP_FOLLOW,
  COMMAND_HELP_GAME,
} = require('../constants/commands')
const {
  COMMAND_HELP_ADMIN_DESC,
  COMMAND_HELP_BOT_DESC,
  COMMAND_HELP_FOLLOW_DESC,
  COMMAND_HELP_GAME_DESC,
} = require('./commandDescriptions')

// TODO: remove file
const buildSubTypessgArr = isAdmin => {
  const arr = [
    [COMMAND_HELP_GAME, COMMAND_HELP_GAME_DESC],
    [COMMAND_HELP_BOT, COMMAND_HELP_BOT_DESC],
    [COMMAND_HELP_FOLLOW, COMMAND_HELP_FOLLOW_DESC],
  ]
  if (isAdmin) arr.push([COMMAND_HELP_ADMIN, COMMAND_HELP_ADMIN_DESC])

  return arr
}

// TODO: исправить в соосветствии с ML
module.exports = ({ from: { displayName }, isAdmin }, commands) => {
  let msg = `Привет *${displayName}*!`

  msg += '\n\n'

  msg += '*Доступные команды:*'

  commands.forEach(({ command, description }) => {
    msg += `\n/${command} - _${description}_`
  })

  msg += '\n\n*Помощь по игре:*'

  buildSubTypessgArr(isAdmin).forEach(([command, description]) => {
    msg += `\n\`/${COMMAND_HELP} ${command}\` - _${description}_`
  })

  return msg
}
