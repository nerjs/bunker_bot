const { Admin } = require('../../db')
const typing = require('../../helpers/typing')
const { editAdminListInline } = require('../../keyboards')

module.exports = async ctx => {
  await typing(ctx)
  const admins = await Admin.find()

  let msg = admins
    .map(
      ({ username, displayName, id }) =>
        ` ${id === ctx.from.id ? '☑️ ' : ' '}[@${username}] ___${(displayName || '').trim()}___ `,
    )
    .join('\n')

  await ctx.replyWithMarkdown(msg, (await editAdminListInline(ctx, admins.length)).extra())
}
