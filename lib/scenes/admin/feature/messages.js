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
