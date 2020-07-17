const { Scene } = require('../../../../bot')
const { MLC_BACK } = require('../../../common/mlc')
const { leave, enter, canReenter } = require('./enter')

const featureEditFTypesScene = new Scene('admin_feature_edit_ftypes')
featureEditFTypesScene.inheritCbQuery()
featureEditFTypesScene.enter(enter)
featureEditFTypesScene.leave(leave)
featureEditFTypesScene.reenter(canReenter)

featureEditFTypesScene.enter(ctx => console.log(ctx.scene.state))
featureEditFTypesScene.hears(MLC_BACK, Scene.back())

module.exports = featureEditFTypesScene
