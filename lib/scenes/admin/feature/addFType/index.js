const { Scene } = require('../../../../bot')
const { backKeyboard } = require('../../../common/keyboards')
const { MLC_BACK } = require('../../../common/mlc')
const { enterTitle } = require('./messages')
const enter = require('./enter')
const input = require('./input')

const addFTypeScene = new Scene('admin_add_ftype')

addFTypeScene.message(enterTitle, true)
addFTypeScene.markup(backKeyboard)
addFTypeScene.enter(enter)
// addFTypeScene.inherit(true)

addFTypeScene.hears(MLC_BACK, Scene.parent())

addFTypeScene.on('text', input)

module.exports = addFTypeScene
