const logger = require('nlogs')(module)
const { Admin } = require('../../db')

const { FIRST_ADMIN } = process.env

module.exports = async ctx => {
  if (typeof ctx.isAdmin === 'boolean') return ctx.__admin

  const {
    from: { id, username, first_name, last_name },
  } = ctx

  let admin = await Admin.findOne({ id })
  if (admin) return admin

  if (FIRST_ADMIN && FIRST_ADMIN === username) {
    admin = await Admin.create({
      id,
      username,
      displayName: `${first_name} ${last_name}`,
      canEditAdmins: true,
    })

    logger.debug('New admin: ', { id, username })

    return admin || null
  }

  return false
}
