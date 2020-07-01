const isAdmin = require('./isAdmin')

module.exports = async ctx => {
  const admin = await isAdmin(ctx)
  return !!(admin && admin.canEditAdmins)
}
