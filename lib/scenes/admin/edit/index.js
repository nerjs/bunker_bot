const { Scene } = require('../../../bot')
const { inputHelperText } = require('./messages')
const { backKeyboard } = require('../../common/keyboards')
const { MLC_BACK } = require('../../common/mlc')
const { editEnter, editLeave, wrongName } = require('./enterLeave')
const input = require('./input')
const { ACTION_CONFIRM, ACTION_CANCEL } = require('../../common/actions')
const { confirmEdit, cancelEdit } = require('./edit')

const editAdminsScene = new Scene('edit_admins')
editAdminsScene.message(inputHelperText)
editAdminsScene.markup(backKeyboard)

editAdminsScene.enter(editEnter)
editAdminsScene.leave(editLeave)

editAdminsScene.hears(MLC_BACK, Scene.parent())
editAdminsScene.hears(/\@?(?<username>\w+)/, input)
editAdminsScene.action(ACTION_CONFIRM, confirmEdit)
editAdminsScene.action(ACTION_CANCEL, cancelEdit)

editAdminsScene.on('text', wrongName)

module.exports = editAdminsScene
