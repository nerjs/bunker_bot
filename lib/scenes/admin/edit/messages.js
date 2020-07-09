const ML = require('../../../helpers/ml')
const { COMMAND_RELOAD } = require('../../common/commands')

exports.inputHelperText = ML('Введите ник игрока')

exports.wrongInputText = ML('Неверный формат')

exports.confirmAddAdmin = ML(
  (ctx, { username }) => `
  Сделать @${username} админом?
`,
)
exports.confirmRemoveAdmin = ML(
  (ctx, { username }) => `
  Удалить @${username} из админов?
`,
)

exports.userNotInstallBot = ML(
  (ctx, { username }) => `
  Невозможно сделать админом.
  @${username} не связан с ботом.
`,
)
exports.userAlreadyAdmin = ML(
  (ctx, { username }) => `
  Невозможно сделать админом.
   @${username} и так админ.
`,
)
exports.userNotAdmin = ML(
  (ctx, { username }) => `
  Невозможно удалить из админов.
  @${username} и так не админ.
`,
)
exports.successAddAdmin = ML(
  (ctx, { username }) => `
   @${username} теперь админ.
`,
)
exports.successRemoveAdmin = ML(
  (ctx, { username }) => `
  @${username} теперь не админ.
`,
)

exports.youAddedToAdmins = ML(
  (ctx, { username }) => `
  Вас добавили в список админов.
  ✍️ @${username}.

  Используйте /${COMMAND_RELOAD} для обновления сессии
`,
)
exports.youRemovedFromAdmins = ML(
  (ctx, { username }) => `
  Вас удалили из списка админов.
  ✍️ @${username}.

  Используйте /${COMMAND_RELOAD} для обновления сессии
`,
)
