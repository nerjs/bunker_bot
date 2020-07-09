const { Scene } = require('../../bot')
const { adminHello } = require('./messages')
const keyboard = require('./keyboard')
const { MLC_BACK } = require('../common/mlc')
const { MLC_ADMIN_FEATURES, MLC_ADMIN_CARDS, MLC_ADMIN_TIMINGS, MLC_ADMIN_LIST } = require('./mlc')
const adminList = require('./adminList')
const { ACTION_ADMIN_ADD, ACTION_ADMIN_REMOVE } = require('./action')
const editAdminScene = require('./edit')
const onlyAdmin = require('../../middlewares/onlyAdmin')
const onlyPrivate = require('../../middlewares/onlyPrivate')

const adminScene = new Scene('admin')
adminScene.message(adminHello)
adminScene.markup(keyboard)

adminScene.use(onlyPrivate)
adminScene.hears(MLC_BACK, Scene.root())
adminScene.use(onlyAdmin)

adminScene.hears(MLC_ADMIN_LIST, adminList)
adminScene.register(editAdminScene)
adminScene.action(ACTION_ADMIN_ADD, Scene.child(editAdminScene))
adminScene.action(ACTION_ADMIN_REMOVE, Scene.child(editAdminScene))

module.exports = adminScene
