const { Markup } = require('telegraf')
const logger = require('nlogs')(module)
const { backKeyboard } = require('../../common/keyboards')
const { addFType, noOneFeatureTypes, hasFeatureTypes } = require('./messages')
const { FType } = require('../../../db')
const { MVA_EDIT_F_TYPE } = require('./mva')
const { ACTION_NEW_FTYPE } = require('./actions')

exports.leaveFeature = async ctx => {
  if (!ctx.scene.state.fTypesMessage) return
  const { fTypesMessage } = ctx.scene.state
  delete ctx.scene.state.fTypesMessage
  try {
    await ctx.deleteMessage(fTypesMessage)
  } catch (e) {
    logger.error(e)
  }
}

exports.enterFeature = async ctx => {
  if (ctx.scene.isMoving()) return
  await exports.leaveFeature(ctx)

  const fTypes = await FType.find().select('title')

  const message = fTypes.length ? hasFeatureTypes : noOneFeatureTypes

  const buttons = fTypes.map(({ id, title }) => Markup.callbackButton(title, MVA_EDIT_F_TYPE(id)))
  buttons.push(Markup.callbackButton(addFType(ctx), ACTION_NEW_FTYPE))

  const { message_id } = await ctx.replyWithMarkdown(message(ctx), Markup.inlineKeyboard(buttons, { columns: 1 }).extra())
  ctx.scene.state.fTypesMessage = message_id
}
