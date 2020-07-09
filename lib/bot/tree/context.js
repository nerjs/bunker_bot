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

  set current(scene) {
    const sceneId = SceneLinker.getId(scene)
    this.session.current = sceneId
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

  async enter(sceneId, currentMessage) {
    const scene = this.linker.get(sceneId)
    const { down, up } = this.linker.path(this.current, sceneId)

    if (!scene) throw new Error(`Can't find scene: ${SceneLinker.getId(sceneId, true)}`)
    if (scene === this.current) return

    this.refer = { from: this.current, to: scene, move: true }
    await this.current.leaveMiddleware()(this.ctx, noop)

    for (let downScene of down) {
      if (this.refer.stopped) break
      this.current = downScene
      await downScene.leaveMiddleware()(this.ctx, noop)
    }

    for (let upScene of up) {
      if (this.refer.stopped) break
      this.current = upScene
      await upScene.enterMiddleware()(this.ctx, noop)
    }

    if (!this.refer.stopped) {
      this.current = scene
      await this.current.enterMiddleware()(this.ctx, noop)
    }
    if (this.refer.from !== this.current) {
      await this.current.sendHeaders(this.ctx, currentMessage)
    }
    delete this.refer.move
  }

  isMoving() {
    return !!this.refer.move
  }

  isStopped() {
    return !!this.refer.stopped
  }

  async sendHeaders(message) {
    if (!this.isMoving()) return this.current.sendHeaders(this.ctx, message)
  }

  hasBack() {
    return !this.isMoving() && !!this.refer.from
  }

  backIsParent() {
    return this.hasBack() && this.refer.from === this.current.parent
  }

  stop() {
    if (this.isMoving()) this.refer.stopped = true
  }

  jump(scene, message) {
    return this.enter(scene, message)
  }

  root(message) {
    return this.enter(this.linker.root, message)
  }

  parent(message) {
    if (this.current.parent) return this.enter(this.current.parent, message)
  }

  back(message) {
    if (this.hasBack()) return this.enter(this.refer.from, message)
  }

  async child(scene, message) {
    if (!this.linker.isChild(this.current, scene))
      throw new Error(
        `Scene ${SceneLinker.getId(scene, true)} is not a child scene ${SceneLinker.getId(this.current, true)}`,
      )

    return this.enter(scene, message)
  }
}

module.exports = SceneContext
