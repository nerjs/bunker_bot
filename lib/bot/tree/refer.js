const SceneLinker = require('./linker')

class SceneContextRefer {
  constructor(sceneContext, props = {}) {
    this.ctx = sceneContext

    Object.keys(props).forEach(key => {
      this[key] = props[key]
    })

    if (!this.ctx.session.refer) this.ctx.session.refer = {}
  }

  get refer() {
    this.ctx.session.refer = this.ctx.session.refer || {}
    return this.ctx.session.refer
  }

  set move(val) {
    this.refer.move = !!val
    if (!this.refer.move) {
      delete this.refer.move
    }
  }
  get move() {
    return !!this.refer.move
  }

  set from(scene) {
    if (scene) {
      this.refer.from = SceneLinker.getId(scene)
    } else {
      delete this.refer.from
    }
  }

  get from() {
    return this.refer.from ? this.ctx.linker.get(this.refer.from) : null
  }

  set to(scene) {
    if (scene) {
      this.refer.to = SceneLinker.getId(scene)
    } else {
      delete this.refer.to
    }
  }

  get to() {
    return this.refer.to ? this.ctx.linker.get(this.refer.to) : null
  }
}

module.exports = SceneContextRefer
