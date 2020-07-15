const { Markup } = require('telegraf')
const { MLC_ADMIN_FEATURE, MLC_ADMIN_CARDS, MLC_ADMIN_TIMINGS, MLC_ADMIN_LIST } = require('./mlc')
const { MLC_BACK } = require('../common/mlc')

module.exports = ctx =>
  Markup.keyboard(
    [MLC_ADMIN_FEATURE, MLC_ADMIN_CARDS, MLC_ADMIN_TIMINGS, MLC_ADMIN_LIST, MLC_BACK].map(command =>
      Markup.button(command(ctx)),
    ),
    { columns: 2 },
  ).resize()
