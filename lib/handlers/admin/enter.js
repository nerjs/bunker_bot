const { Markup } = require('telegraf')
const getText = require('../../messages/admin/enterAdminPanel')
const { MLC_HOME, MLC_ADMIN_LIST, MLC_ADMIN_FEATURES, MLC_ADMIN_CARDS, MLC_ADMIN_TIMINGS } = require('../../constants/mlc')

module.exports = async ctx => {
  const buttons = [[MLC_ADMIN_FEATURES, MLC_ADMIN_CARDS], [MLC_ADMIN_TIMINGS, MLC_ADMIN_LIST], [MLC_HOME]].map(arr =>
    arr.map(action => action(ctx)),
  )

  ctx.reply(getText(ctx), { reply_markup: Markup.keyboard(buttons).resize() })
}
