const { Composer, Markup } = require('telegraf')
const { PARENT_SCENE, CAN_REENTER } = require('./constants')

const DEFAULT_OPTIONS = {
  sessionName: 'session',
}

const noop = () => Promise.resolve()

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
    this[CAN_REENTER] = null
    this.header = {}
    this.inheritance = {}

    this.enterHandler = Composer.compose([])
    this.leaveHandler = Composer.compose([])

    if (this.options.message) this.message(this.options.message, !!this.options.md)
    if (this.options.markup) this.markup(this.options.markup)
  }

  set parent(scene) {
    if (!(scene instanceof Scene)) throw new Error('Wrong scene.parent value. Must be a Scene instance')
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

  canReenter(ctx) {
    return this[CAN_REENTER] ? this[CAN_REENTER](ctx) : Promise.resolve(false)
  }

  inherit(updateType, value = true) {
    if (!updateType || typeof updateType !== 'string')
      throw new Error(`Incorrect Scene.inherit() argument. [updateType: ${updateType}]`)
    this.inheritance[updateType] = !!value
    return this
  }

  inheritText(value = true) {
    return this.inherit('message', !!value)
  }

  inheritCbQuery(value = true) {
    return this.inherit('callback_query', !!value)
  }

  middleware() {
    const middlewares = Object.keys(this.inheritance)
      .filter(key => !!this.inheritance[key])
      .map(updateType => Composer.mount(updateType, this.parent))

    return Composer.compose([super.middleware(), ...(this.parent && middlewares.length ? middlewares : [])])
  }

  register(scene) {
    if (!(scene instanceof Scene)) throw new Error('Wrong scene.register() argument. Must be a Scene instance')
    if (this.childs.has(scene.id)) throw new Error(`Duplicate IDS. [id: ${scene.id}, parent: ${this.id}]`)

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

  headerFirst(val) {
    this.header.headerFirst = !!val
  }

  setHeaders(obj) {
    if (typeof obj === 'object') {
      this.header = { ...obj }
    } else if (typeof obj === 'function') {
      this.header = {
        cb: obj,
      }
    }
  }

  async getHeaders(ctx, currentMessage) {
    if (this.header.cb) return this.header.cb(ctx, currentMessage)

    return { ...this.header, message: currentMessage || this.header.message }
  }

  async sendHeaders(ctx, currentMessage, goEnterMiddleware) {
    const enterMiddleware = goEnterMiddleware ? this.enterMiddleware() : noop
    if (!this.header.message) {
      if (Object.keys(this.header).length) throw new Error(`message is required. header: ${JSON.stringify(this.header)}`)
      return enterMiddleware(ctx, noop)
    }

    const { markup, md, commands, message, headerFirst } = await this.getHeaders(ctx, currentMessage)

    if (!headerFirst) {
      await enterMiddleware(ctx, noop)
    }

    const msg = typeof message === 'function' ? await message(ctx) : `${message}`
    const extra = await (async () => {
      if (!markup) return
      const res = typeof markup === 'function' ? await markup(ctx) : markup

      return res instanceof Markup ? res.extra() : res
    })()

    if (commands) {
      const arrCommands = Array.isArray(commands) ? commands : typeof commands === 'function' ? await commands(ctx) : []

      if (Array.isArray(arrCommands) && arrCommands.length && arrCommands.every(ac => ac.command && ac.description)) {
        await ctx.setMyCommands(arrCommands)
      }
    }

    await (md ? ctx.replyWithMarkdown(msg, extra) : ctx.reply(msg, extra))

    if (headerFirst) {
      await enterMiddleware(ctx, noop)
    }
  }

  reenter(fn) {
    this[CAN_REENTER] = fn
  }

  jump(ctx) {
    return ctx.scene.enter(this.id)
  }

  static enter(...args) {
    return ctx => ctx.scene.enter(...args)
  }

  static jump(...args) {
    return ctx => ctx.scene.enter(...args)
  }

  static root(...args) {
    return ctx => ctx.scene.root(...args)
  }

  static parent(...args) {
    return ctx => ctx.scene.parent(...args)
  }

  static back(...args) {
    return ctx => ctx.scene.back(...args)
  }

  static child(...args) {
    return ctx => ctx.scene.child(...args)
  }
}

module.exports = Scene
