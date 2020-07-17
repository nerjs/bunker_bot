const ML = require('../../../helpers/ml')

exports.featureHello = ML('*Характеристики* (категории)')

exports.noOneFeatureTypes = ML(`
Не ни одной категории.
Создайте новую категорию характеристик.
`)

exports.hasFeatureTypes = ML(`
Выберите категорию для редактирования или создайте новую.
`)

exports.addFType = ML('✍️ Создать категорию')

exports.F_TYPE_TITLE = ML('Название')
exports.F_TYPE_DESCRIPTION = ML('Описание')
exports.F_TYPE_DRAFT = ML('Черновик')
exports.F_TYPE_HELP = ML('Помощь')
exports.F_TYPE_FIELDS = ML('Доп. поля')
