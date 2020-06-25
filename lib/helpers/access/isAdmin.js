const { Admin } = require('../../db')

const { FIRST_ADMIN } = process.env

module.exports = async ctx => {
  const {
    message: {
      from: { id, username, first_name, last_name },
    },
  } = ctx

  if (await Admin.exists({ id })) return true

  if (FIRST_ADMIN && FIRST_ADMIN === username) {
    await Admin.create({
      id,
      username,
      displayName: `${first_name} ${last_name}`,
    })

    return true
  }

  return false
}
