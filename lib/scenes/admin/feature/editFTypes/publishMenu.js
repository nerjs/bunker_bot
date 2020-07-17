const { Markup } = require('telegraf')
const { EDIT_F_TYPE, F_TYPE_DRAFT_ADD, F_TYPE_DRAFT_REMOVE, F_TYPE_REMOVE } = require('./messages')
const { F_TYPE_TITLE, F_TYPE_DESCRIPTION, F_TYPE_DRAFT, F_TYPE_HELP, F_TYPE_FIELDS } = require('../messages')
const { MVA_EDIT_F_TYPE_CORE_FIELDS } = require('./mva')

const coreFields = {
  title: F_TYPE_TITLE,
  description: F_TYPE_DESCRIPTION,
  help: F_TYPE_HELP,
}

const buildFields = fields => {
  return {
    message: '',
    buttons: [],
  }
}

module.exports = async (ctx, fType) => {
  if (ctx.callbackQuery) {
    await ctx.answerCbQuery(`Edit${fType.isDraft ? ' draft' : ''} ${fType.title || fType.id}`, false, { cache_time: 2 })
  }

  const { id, title, description, isDraft, help, fields } = fType
  let message = EDIT_F_TYPE(ctx)
  message += '\n\n'

  if (isDraft) {
    message += `___${F_TYPE_DRAFT(ctx)}___: ✅ \n`
  }

  const buttons = []

  Object.keys(coreFields)
    .map(key => {
      buttons.push(
        Markup.callbackButton(`${fType[key] ? '⚙️' : '➕'} ${coreFields[key](ctx)}`, MVA_EDIT_F_TYPE_CORE_FIELDS(key)),
      )
      return key
    })
    .filter(key => !!fType[key])
    .forEach(key => {
      message += `___${coreFields[key](ctx)}___: ${fType[key]} \n`
    })


  if (fields && Array.isArray(fields) && fields.length) {
    message += `${F_TYPE_FIELDS(ctx)}: \n`
    const fieldsMsg = buildFields(fields)
    message += fieldsMsg.message
    buttons.push(...fieldsMsg.buttons)
  }

  buttons.push(
    Markup.callbackButton(isDraft ? F_TYPE_DRAFT_REMOVE(ctx) : F_TYPE_DRAFT_ADD(ctx), MVA_EDIT_F_TYPE_CORE_FIELDS('draft')),
  )
  
  buttons.push(Markup.callbackButton(F_TYPE_REMOVE(ctx), MVA_EDIT_F_TYPE_CORE_FIELDS('remove')))

  await ctx.replyWithMarkdown(message, Markup.inlineKeyboard(buttons, { columns: 1 }).extra())
}
