const { bot, sceneEnter, stage, Scene, sceneLeave } = require('../bot')
const {
  enterAdminPanel,
  leaveAdminPanel,
  showAdminList,
  addOrRemoveAdmins,
  enterEditAdmins,
  inputEditAdmins,
  confirmEditAdmins,
  cancelEditAdmins,
} = require('../handlers/admin')
const onlyAdmin = require('../middlewares/onlyAdmin')
const onlyPrivate = require('../middlewares/onlyPrivate')
const onlyCanEditAdmins = require('../middlewares/onlyCanEditAdmins')
const { COMMAND_ADMIN } = require('../constants/commands')
const { MLC_ADMIN, MLC_BACK, MLC_HOME, MLC_ADMIN_LIST } = require('../constants/mlc')
const { SCENE_ADMIN_PANEL, SCENE_ADMIN_EDIT } = require('../constants/scenes')
const {
  ACTION_ADMIN_REMOVE,
  ACTION_ADMIN_ADD,
  ACTION_ADMIN_EDIT_CONFIRM_S,
  ACTION_CONFIRM,
  ACTION_CANCEL,
} = require('../constants/actions')

// ADD OR REMOVE
const editAdmins = new Scene(SCENE_ADMIN_EDIT)

editAdmins.use(onlyAdmin)
editAdmins.enter(enterEditAdmins)
editAdmins.hears(MLC_BACK, sceneEnter(SCENE_ADMIN_PANEL))
editAdmins.hears(/\@(?<username>\w+)/, inputEditAdmins)
editAdmins.action(ACTION_CONFIRM, onlyCanEditAdmins, confirmEditAdmins)
editAdmins.action(ACTION_ADMIN_EDIT_CONFIRM_S, onlyCanEditAdmins, confirmEditAdmins)
editAdmins.action(ACTION_CANCEL, onlyCanEditAdmins, cancelEditAdmins)
// editAdmins.on('message', inputEditAdmins)

// ADMINPANEL
const adminPanel = new Scene(SCENE_ADMIN_PANEL)

adminPanel.use(onlyAdmin)
adminPanel.enter(enterAdminPanel)
adminPanel.leave(leaveAdminPanel)
adminPanel.hears(MLC_ADMIN_LIST, showAdminList)

adminPanel.action(ACTION_ADMIN_ADD, addOrRemoveAdmins)
adminPanel.action(ACTION_ADMIN_REMOVE, addOrRemoveAdmins)

adminPanel.hears(MLC_HOME, sceneLeave())

stage.register(editAdmins)
stage.register(adminPanel)

bot.command(COMMAND_ADMIN, onlyPrivate, onlyAdmin, sceneEnter(SCENE_ADMIN_PANEL))
bot.hears(MLC_ADMIN, onlyPrivate, onlyAdmin, sceneEnter(SCENE_ADMIN_PANEL))
