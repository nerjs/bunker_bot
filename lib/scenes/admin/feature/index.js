const { Scene } = require('../../../bot')
const { featureHello } = require('./messages')
const { backKeyboard } = require('../../common/keyboards')
const { MLC_BACK } = require('../../common/mlc')
const { enterFeature, leaveFeature } = require('./enterLeave')
const addFTypeScene = require('./addFType')
const { ACTION_NEW_FTYPE } = require('./actions')
const editFTypesScene = require('./editFTypes')
const { MVA_EDIT_F_TYPE } = require('./mva')

const featureScene = new Scene('admin_feature')
featureScene.message(featureHello, true)
featureScene.markup(backKeyboard)
featureScene.headerFirst(true)

featureScene.enter(enterFeature)
featureScene.leave(leaveFeature)

featureScene.action(ACTION_NEW_FTYPE, Scene.enter(addFTypeScene))
featureScene.register(addFTypeScene)

featureScene.action(MVA_EDIT_F_TYPE, Scene.enter(editFTypesScene))
featureScene.register(editFTypesScene)

featureScene.hears(MLC_BACK, Scene.parent())

module.exports = featureScene
