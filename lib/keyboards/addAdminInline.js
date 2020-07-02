const { canEditAdmins } = require('../helpers/access')
const { COMMAND_ADMIN_CONFIRM_SUPERADMIN_TEXT } = require('../messages/commands')
const { ACTION_ADMIN_EDIT_CONFIRM_S } = require('../constants/actions')
const confirmInline = require('./confirmInline')

module.exports = ctx => {
  if (canEditAdmins(ctx))
    return confirmInline(ctx, { text: COMMAND_ADMIN_CONFIRM_SUPERADMIN_TEXT(ctx), action: ACTION_ADMIN_EDIT_CONFIRM_S })

  return confirmInline(ctx)
}
