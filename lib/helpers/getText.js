const fs = require('fs')
const path = require('path')

const textCache = new Map()

module.exports = name =>
  new Promise((resolve, reject) => {
    if (textCache.has(name)) return resolve(textCache.get(name))
    const fullPath = path.join(__dirname, '..', 'messages', `${name}.md`)

    fs.exists(fullPath, exist => {
      if (!exist) return reject(new Error(`Text file ${name} not found`))

      fs.readFile(fullPath, (err, data) => {
        if (err) return reject(err)

        textCache.set(name, `${data}`)
        resolve(textCache.get(name))
      })
    })
  })
