const { Composer, Markup } = require('telegraf')
const SceneContext = require('./context')

const DEFAULT_OPTIONS = {
  sessionName: 'session',
}

const PARENT_SCENE = Symbol('Parent scene')

class Scene extends Composer {
  constructor(id, options = {}) {
    if (!id) throw new Error(`Wrong scene ID. [ID: ${id}]`)

    super()

    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    }

    this.id = id
    this.childs = new Map()
    this[PARENT_SCENE] = null
    this.header = {}

    this.enterHandler = Composer.compose([])
    this.leaveHandler = Composer.compose([])

    if (this.options.message) this.message(this.options.message, !!this.options.md)
    if (this.options.markup) this.markup(this.options.markup)
  }

  set parent(scene) {
    if (!scene || !(scene instanceof Scene)) throw new Error('Wrong scene.parent value. Must be a Scene instance')
    if (this[PARENT_SCENE])
      throw new Error(
        `A scene can only have one parent. [current: ${this.id}, parent: ${this[PARENT_SCENE]}, new parent: ${scene.id}]`,
      )

    this[PARENT_SCENE] = scene
  }

  get parent() {
    return this[PARENT_SCENE]
  }

  set ttl(value) {
    this.options.ttl = value
  }

  get ttl() {
    return this.options.ttl
  }

  register(scene) {
    if (!scene || !(scene instanceof Scene)) throw new Error('Wrong scene.register() argument. Must be a Scene instance')
    if (this.childs.has(scene.id)) throw new Error(`Duplicate IDS. [id: ${scene.id}, parent: ${this.id}]`)
    if (scene.isRoot)
      throw new Error(`It is not possible to register the root scene. [current: ${this.id}, target: ${scene.id}]`)

    this.childs.set(scene.id, scene)
    scene.parent = this
  }

  enter(...fns) {
    this.enterHandler = Composer.compose([this.enterHandler, ...fns])
    return this
  }

  leave(...fns) {
    this.leaveHandler = Composer.compose([this.leaveHandler, ...fns])
    return this
  }

  enterMiddleware() {
    return this.enterHandler
  }

  leaveMiddleware() {
    return this.leaveHandler
  }

  message(msg, md) {
    if (typeof msg !== 'string' && typeof msg !== 'function')
      throw new Error(`Wrong scene.message() argument. Must be a string or function.`)
    this.header.message = msg
    this.header.md = !!md

    return this
  }

  markup(mkp) {
    if (!(mkp instanceof Markup) && typeof mkp !== 'function')
      throw new Error(`Wrong scene.markup() argument. Must be a Markup instance or function.`)

    this.header.markup = mkp

    return this
  }

  commands(cmd) {
    if (!Array.isArray(cmd) && typeof cmd !== 'function')
      throw new Error(`Wrong scene.message() argument. Must be a array or function.`)
    this.header.commands = cmd

    return this
  }

  async sendHeaders(ctx) {
    if (!this.header.message) {
      if (Object.keys(this.header).length) throw new Error(`message is required. header: ${JSON.stringify(this.header)}`)
      return
    }

    const { message, markup, md, commands } = this.header

    const msg = typeof message === 'function' ? await message(ctx) : `${message}`
    const extra = await (async () => {
      if (!markup) return
      res = typeof markup === 'function' ? await markup(ctx) : markup

      return res instanceof Markup ? res.extra() : res
    })()

    if (commands) {
      const arrCommands = Array.isArray(commands) ? commands : typeof commands === 'function' ? await commands(ctx) : []

      if (Array.isArray(arrCommands) && arrCommands.length && arrCommands.every(ac => ac.command && ac.description)) {
        await ctx.setMyCommands(arrCommands)
      }
    }

    return md ? ctx.replyWithMarkdown(msg, extra) : ctx.reply(msg, extra)
  }

  go(ctx, ...args) {
    return ctx.scene.enter(this.id, ...args)
  }

  back(ctx, ...args) {
    return ctx.scene.back(...args)
  }

  static enter(...args) {
    return ctx => ctx.scene.enter(...args)
  }

  static leave(...args) {
    return ctx => ctx.scene.leave(...args)
  }

  static back(...args) {
    return ctx => ctx.scene.back(...args)
  }
}

module.exports = Scene
