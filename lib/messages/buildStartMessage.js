module.exports = ({ from: { displayName } }, commands) => {
  let msg = `Привет *${displayName}*!`

  msg += '\n\n'

  msg += 'Доступные команды:'

  commands.forEach(({ command, description }) => {
    msg += `\n/${command} - _${description}_`
  })

  return msg
}
