const { Scene } = require('../../../../bot')
const { MLC_BACK } = require('../../../common/mlc')

const featureEditFTypesScene = new Scene('admin_feature_edit_ftypes')
featureEditFTypesScene.message(ctx => `Hello - ${ctx.mvaValue}`)
// featureEditFTypesScene.inherit('hello')

featureEditFTypesScene.enter(ctx => console.log(ctx.scene.state))
featureEditFTypesScene.hears(MLC_BACK, Scene.back())

module.exports = featureEditFTypesScene
