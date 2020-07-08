const { Markup } = require('telegraf')
const { MLC_HELP_BOT, MLC_HELP_GAME, MLC_HELP_BROADCAST, MLC_HELP_ADMIN } = require('./mlc')
const { MLC_BACK } = require('../common/mlc')

module.exports = ctx => {
  const commands = [MLC_HELP_BOT, MLC_HELP_GAME, MLC_HELP_BROADCAST, MLC_BACK]

  if (ctx.isAdmin) commands.splice(3, 0, MLC_HELP_ADMIN)

  return Markup.keyboard(
    commands
      .map(command => Markup.button(command(ctx)))
      .reduce((res, cur, i) => {
        if (!(i % 2)) res.push([])
        res[res.length - 1].push(cur)
        return res
      }, []),
  ).resize()
}
