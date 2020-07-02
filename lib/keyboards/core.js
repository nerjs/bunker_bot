const { Markup } = require('telegraf')
const { MLC_ADMIN, MLC_CURRENT, MLC_FOLLOW, MLC_HELP } = require('../constants/mlc')

module.exports = ctx => {
  const keyboardArr = [MLC_HELP, MLC_CURRENT, MLC_FOLLOW]

  if (ctx.isAdmin) keyboardArr.push(MLC_ADMIN)

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

  return Markup.keyboard(keyboard.map(kb => kb.map(text => Markup.button(text(ctx))))).resize()
}
