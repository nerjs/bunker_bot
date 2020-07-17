const { FType } = require('../../../../db')
const { enterTitle, duplicateTitle, rangeTitle } = require('./messages')
const editFTypesScene = require('../editFTypes')
const { UNKNOWN_ERROR } = require('../../../../messages/errorMessages')
const typing = require('../../../../helpers/typing')
const { SilentBotError } = require('../../../../helpers/error')

const sendAnswer = async (ctx, message) =>
  ctx.replyWithMarkdown(`
${message(ctx)} 
${enterTitle(ctx)}
`)

module.exports = async ctx => {
  const {
    message: { text },
  } = ctx

  await typing(ctx)

  if (await FType.exists({ title: text })) return sendAnswer(ctx, duplicateTitle)

  try {
    const { id } = await FType.create({ title: text, isDraft: true })
    ctx.scene.state.createdFType = {
      id,
      title: text,
    }
  } catch (e) {
    if (
      e &&
      e.errors &&
      Object.keys(e.errors).some(key => ['regexp', 'minlength', 'maxlength'].includes(e.errors[key].kind))
    )
      return sendAnswer(ctx, rangeTitle)

    await sendAnswer(ctx, UNKNOWN_ERROR)

    throw new SilentBotError(e)
  }

  await ctx.scene.enter(editFTypesScene)
}
