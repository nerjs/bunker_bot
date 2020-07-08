const { User } = require('../db')
const logger = require('nlogs')(module)
const { BotError } = require('../helpers/error')
const { UNKNOWN_ERROR } = require('../messages/errorMessages')
const buildDisplayName = require('../helpers/buildDisplayName')

const updateUser = async (user, fields = [], isCreate) => {
  const resFields = fields.filter(([, is, prev, next]) => is && prev !== next)

  if (resFields.length) {
    resFields.forEach(([fieldName, , , nextValue]) => {
      user[fieldName] = nextValue
    })

    if (isCreate) {
      await User.create({ ...user })
      logger.debug('Create user', user)
    } else {
      await User.findOneAndUpdate({ id: user.id }, { ...user })
      logger.debug('Update user', user)
    }
  }
}

module.exports = async (ctx, next) => {
  if (!ctx.from) return next(ctx)
  const { from, chat } = ctx

  const user = ctx.session.user || (await User.findOne({ id: from.id }).lean()) || null

  if (user) {
    await updateUser(user, [
      ['chatId', chat.type === 'private', user.chatId, chat.id],
      ['displayName', true, user.displayName, buildDisplayName(from)],
      ['username', true, user.username, from.username],
    ])
  }

  ctx.session.user = user ? { ...user } : null

  Object.defineProperty(ctx, 'user', {
    get() {
      return ctx.session.user
    },
    set(newUser) {
      ctx.session.user = newUser && typeof newUser === 'object' ? { ...newUser } : ctx.session.user
      if (!ctx.session.user.id) throw new BotError('Incorrect user object', UNKNOWN_ERROR(ctx), { user: ctx.session.user })
    },
  })

  Object.defineProperty(ctx, 'isAdmin', {
    get() {
      return ctx.user && ctx.user.isAdmin
    },
  })

  await next(ctx)

  if (ctx.user) {
    const prevUser = user ? { ...user } : {}

    await updateUser(
      prevUser,
      [
        ['id', true, prevUser.id, ctx.user.id],
        ['chatId', chat.type === 'private', prevUser.chatId, ctx.user.chatId],
        ['displayName', true, prevUser.displayName, ctx.user.displayName],
        ['username', true, prevUser.username, ctx.user.username],
        ['isAdmin', true, prevUser.isAdmin, ctx.user.isAdmin],
      ],
      !user,
    )
  }
}
