const { COMMAND_HELP, COMMAND_HELP_ADMIN, COMMAND_HELP_BOT, COMMAND_HELP_FOLLOW, COMMAND_HELP_GAME } = require('./commands')

exports.ACTION_HELP = `${COMMAND_HELP}_${COMMAND_HELP}`
exports.ACTION_HELP_ADMIN = `${COMMAND_HELP}_${COMMAND_HELP_ADMIN}`
exports.ACTION_HELP_BOT = `${COMMAND_HELP}_${COMMAND_HELP_BOT}`
exports.ACTION_HELP_FOLLOW = `${COMMAND_HELP}_${COMMAND_HELP_FOLLOW}`
exports.ACTION_HELP_GAME = `${COMMAND_HELP}_${COMMAND_HELP_GAME}`