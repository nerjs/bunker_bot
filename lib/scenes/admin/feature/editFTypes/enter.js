const logger = require('nlogs')(module)
const { FType } = require('../../../../db')
const { BotError } = require('../../../../helpers/error')
const { UNKNOWN_ERROR } = require('../../../../messages/errorMessages')
const publishMenu = require('./publishMenu')

const getFType = async ctx => {
  const { createdFType } = ctx.scene.state
  const { mvaValue } = ctx

  let fType = null
  if (createdFType && createdFType.id) {
    fType = { ...createdFType, isDraft: true }
    delete ctx.scene.state.createdFType
  } else if (mvaValue) {
    fType = await FType.findById(mvaValue)
  }

  return fType
}

exports.leave = async ctx => {
  const { editFType } = ctx.scene.state
  if (!editFType) return
  delete ctx.scene.state.editFType

  if (!editFType.messageId) return
  try {
    await ctx.deleteMessage(editFType.messageId)
  } catch (e) {
    logger.error(e)
  }
}

exports.enter = async ctx => {
  const fType = await getFType(ctx)
  if (!fType) throw new BotError(`fType not found`, UNKNOWN_ERROR(ctx), { fType, from: ctx.from })
  const messageId = await publishMenu(ctx, fType)
  ctx.scene.state.editFType = {
    id: fType.id,
    messageId,
  }
}

exports.canReenter = ctx =>
  ctx.mvaValue &&
  ctx.scene.state &&
  ctx.scene.state.editFType &&
  ctx.scene.state.editFType.id &&
  ctx.mvaValue !== ctx.scene.state.editFType.id
