const bot = require('../bot')
const adminHandler = require('../handlers/admin')
const onlyAdmin = require('../middlewares/onlyAdmin')
const onlyPrivate = require('../middlewares/onlyPrivate')
const { COMMAND_ADMIN } = require('../constants/commands')
const { MLC_ADMIN } = require('../constants/mlc')

bot.command(COMMAND_ADMIN, onlyPrivate, onlyAdmin, adminHandler)
bot.hears(MLC_ADMIN, onlyPrivate, onlyAdmin, adminHandler)
