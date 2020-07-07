const { Composer, Markup } = require('telegraf')
const { IS_ROOT_SCENE } = require('./constants')
const SceneContext = require('./context')
const Scene = require('./scene')
const SceneLinker = require('./linker')

const DEFAULT_ROOT_OPTIONS = {
  sessionName: 'session',
  ttl: 1000 * 60 * 5,
}

class RootScene extends Scene {
  constructor(id, options = {}) {
    super(id && (typeof id === 'string' || typeof id === 'symbol') ? id : Symbol.for('root'), {
      ...DEFAULT_ROOT_OPTIONS,
      ...(typeof id === 'object' ? id : options && typeof options === 'object' ? options : {}),
    })

    this.linker = new SceneLinker()
    this[IS_ROOT_SCENE] = true
    this.linker.add(this)
  }

  set parent(scene) {
    throw new Error(`It is not possible to add a parent to the root scene. [current: ${this.id}, target: ${scene.id}]`)
  }

  get parent() {
    return null
  }

  register(scene) {
    super.register(scene)
    this.linker.add(scene)
    return this
  }

  middleware() {
    const handler = Composer.compose([
      (ctx, next) => {
        ctx.scene = new SceneContext(ctx, this.linker, this.options)
        return next(ctx)
      },
      super.middleware(),
      Composer.lazy(ctx => (ctx.scene.current === this ? Composer.safePassThru() : ctx.scene.current)),
      (ctx, next) => {
        delete ctx.scene
        return next(ctx)
      },
    ])
    return Composer.optional(ctx => ctx[this.options.sessionName], handler)
  }
}

module.exports = RootScene
