const { MLC_ADMIN, MLC_CURRENT, MLC_FOLLOW, MLC_HELP } = require('../../constants/mlc')

module.exports = ctx => {
  const keyboardArr = [MLC_HELP(ctx), MLC_CURRENT(ctx), MLC_FOLLOW(ctx)].map(text => ({ text }))

  if (ctx.isAdmin) keyboardArr.push({ text: MLC_ADMIN(ctx) })

  const keyboard =
    keyboardArr.length < 4
      ? [keyboardArr]
      : keyboardArr.reduce(
          (kb, cur, i) => {
            kb[i % 2 ? 1 : 0].push(cur)
            return kb
          },
          [[], []],
        )

  return {
    keyboard,
    resize_keyboard: true,
  }
}
