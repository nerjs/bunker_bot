const { safePassThru } = require('telegraf/composer')
const SceneLinker = require('./linker')
const logger = require('nlogs')(module)

const noop = () => Promise.resolve()
const now = () => Math.floor(Date.now() / 1000)

class SceneContext {
  constructor(ctx, linker, options = {}) {
    this.ctx = ctx
    this.linker = linker
    this.options = { ...options }
  }

  get session() {
    const sessionName = this.options.sessionName
    let session = this.ctx[sessionName].__scenes || {}
    if (session.expires < now()) {
      session = {}
    }
    this.ctx[sessionName].__scenes = session
    return session
  }

  get state() {
    this.session.state = this.session.state || {}
    return this.session.state
  }

  set state(value) {
    this.session.state = { ...value }
  }

  set refer(value) {
    if (!value || typeof value !== 'object') {
      delete this.session.refer
    } else {
      const { from, to, move } = value
      this.session.refer = { from, to, move }
    }
  }

  get refer() {
    this.session.refer = this.session.refer || {}
    return this.session.refer
  }

  get current() {
    const sceneId = this.session.current
    if (!sceneId) return this.linker.root
    const scene = this.linker.get(sceneId)

    if (scene) return scene

    logger.warn(`Unknown scene [${sceneId}]`)
    this.reset()
    return null
  }

  reset() {
    delete this.ctx[this.options.sessionName].__scenes
  }

  async enter(sceneId) {
    const scene = this.linker.get(sceneId)
    const { down, up } = this.linker.path(this.current, sceneId)

    if (!scene) throw new Error(`Can't find scene: ${SceneLinker.getId(sceneId, true)}`)
    if (scene === this.current) return

    this.refer = { from: this.current, to: scene, move: true }
    await this.current.leaveMiddleware()(this.ctx, noop)

    for (let downScene of down) {
      this.session.current = downScene.id
      await downScene.leaveMiddleware()(this.ctx, noop)
    }
    for (let upScene of up) {
      this.session.current = upScene.id
      await upScene.enterMiddleware()(this.ctx, noop)
    }

    this.session.current = scene.id
    await this.current.enterMiddleware()(this.ctx, noop)
    await this.current.sendHeaders(this.ctx)
    this.refer.move = false
  }

  enter2(sceneId, initialState, silent) {
    if (!sceneId || !this.scenes.has(sceneId)) {
      throw new Error(`Can't find scene: ${sceneId}`)
    }
    const leave = silent ? noop() : this.leave()
    return leave.then(() => {
      debug('Enter scene', sceneId, initialState, silent)
      this.session.current = sceneId
      this.state = initialState
      const ttl = this.current.ttl || this.options.ttl
      if (ttl) {
        this.session.expires = now() + ttl
      }
      if (silent) {
        return Promise.resolve()
      }
      const handler =
        typeof this.current.enterMiddleware === 'function' ? this.current.enterMiddleware() : this.current.middleware()
      return handler(this.ctx, noop)
    })
  }

  leave() {
    debug('Leave scene')
    const handler = this.current && this.current.leaveMiddleware ? this.current.leaveMiddleware() : safePassThru()
    return handler(this.ctx, noop).then(() => this.reset())
  }
}

module.exports = SceneContext
