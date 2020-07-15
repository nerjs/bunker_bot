const ML = require('../../../../helpers/ml')

exports.enterTitle = ML(`
Введите название 
 ___(min:3, max:20)___ 
`)

exports.duplicateTitle = ML('Такая категория уже существует')

exports.rangeTitle = ML(`
Неверный формат.
*[a-z, A-Z, а-я, А-Я, 0-9, -, _, пробел]*
`)
