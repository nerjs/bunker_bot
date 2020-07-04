class SceneLinker {
  constructor() {
    this.scenes = new Map()
    this.paths = new Map()
    this.root = null
  }

  add(scene) {
    if (!scene || !scene.id) throw new Error('Incorrect scene')
    this.scenes.set(scene.id, scene)
    if (!scene.parent) {
      if (this.root && this.root !== scene)
        throw new Error(`The root cannot be added twice. [current: ${this.root.id}, add: ${scene.id}]`)

      this.root = scene
    }
  }

  get(sceneId) {
    if (this.scenes.has(SceneLinker.getId(sceneId))) return this.scenes.get(SceneLinker.getId(sceneId))
    const { scene } = this.find(null, sceneId)
    return scene
  }

  path(from, to) {
    if (!to) return this.path(this.root, from)
    if (this.paths.has(SceneLinker.buildPathKey(from, to))) return this.paths.get(SceneLinker.buildPathKey(from, to))
    const { path } = this.find(from, to)
    return path
  }

  find(from, to) {
    if (!to) return this.find(null, from)
    if (!from) return this.find(this.root, to)
    if (SceneLinker.getId(from) === from) {
      const fromScene = this.get(SceneLinker.getId(from))
      if (!fromScene) throw new Error(`Not found scene ${SceneLinker.getId(from, true)}`)
      return this.find(fromScene, to)
    }
    if (from === to) return { path: { up: [], down: [] }, scene: to }

    const { fromId, toId, up, down, scene } = SceneLinker.find(this.root, from, to)

    if (scene) {
      this.scenes.set(scene.id, scene)
    }

    ;[...up, ...down].forEach(sc => {
      this.scenes.set(sc.id, sc)
    })

    this.paths.set(SceneLinker.buildPathKey(fromId, toId), { up, down })

    return { path: { up, down }, scene }
  }

  static getId(scene, stringReturn) {
    if (typeof scene === 'string') return scene
    if (typeof scene === 'number' || typeof scene === 'symbol' || scene instanceof Date)
      return stringReturn ? scene.toString() : scene
    if (typeof scene === 'object' && scene.id) return this.getId(scene.id, stringReturn)

    throw new Error(`Invalid ID format. [ID: ${scene}]`)
  }

  static buildPathKey(from, to) {
    return `${this.getId(from, true)} __ ${this.getId(to, true)}`
  }

  static find(root, from, to) {
    if (!root || !from || !to)
      throw new Error(
        `Missing SceneLinker.find() arguments: [ ${Object.entries({ root, from, to })
          .filter(([, value]) => !value)
          .map(([key]) => key)
          .join(', ')} ]`,
      )

    const rootId = this.getId(root)
    const fromId = this.getId(from)
    const toId = this.getId(to)
    let scene = null
    const up = []
    const down = []

    if (from === fromId)
      throw new Error(
        `Incorrect SceneLinker.find() argument. Argument from must be an scene object. [target: ${this.getId(
          fromId,
          true,
        )}]`,
      )
    if (!from.parent && from !== root)
      throw new Error(
        `Incorrect SceneLinker.find() argument. from is not equal to the root and does not have a parent. [root: ${this.getId(
          rootId,
          true,
        )}, from: ${this.getId(fromId, true)}]`,
      )

    if (fromId === toId) return { fromId, toId, scene: from, up, down }

    const childs = this.findChild(from, toId)

    if (childs.length) {
      scene = childs.pop()
      up.push(...childs)
    }

    if (rootId !== fromId) {
      const parents = this.findParent(from, toId)
      if (!parents.length)
        throw new Error(
          `Incorrect path to root SceneLinker.find(). [from: ${this.getId(fromId, true)}, to: ${this.getId(toId, true)}]`,
        )
      const lastParent = parents.pop()
      const lastParentId = this.getId(lastParent)

      if (lastParentId === toId) {
        if (scene)
          throw new Error(
            `Duplicate target path SceneLinker.find(). [from: ${this.getId(fromId, true)}, to: ${this.getId(toId, true)}]`,
          )
        down.push(...parents)
        scene = lastParent
      } else if (lastParentId === rootId) {
        const childsFromRoot = this.findChild(root, toId, parents[parents.length - 1] || from)
        if (scene && childsFromRoot.length) {
          if (scene)
            throw new Error(
              `Duplicate target path SceneLinker.find(). [from: ${this.getId(fromId, true)}, to: ${this.getId(toId, true)}]`,
            )
          down.push(...parents)
          scene = childsFromRoot.pop()
          up.push(...childsFromRoot)
        }
      } else {
        throw new Error(
          `Incorrect SceneLinker.findParent() result. [expected: ${this.getId(toId, true)}, result: ${this.getId(
            lastParentId,
            true,
          )}]`,
        )
      }
    }

    if (up.length && down.length) {
      const nDown = [...down].reverse()
      const nUp = [...up]
      nDown.forEach((d, i) => {
        if (d === nUp[i]) {
          up.shift()
          down.pop()
        }
      })
    }

    return { fromId, toId, up, down, scene }
  }

  static findParent(from, toId) {
    const scenes = []

    const findParent = nFrom => {
      if (!nFrom.parent) return
      scenes.push(nFrom.parent)
      if (this.getId(nFrom.parent) === toId) return
      findParent(nFrom.parent)
    }

    findParent(from)

    return scenes
  }

  static findChild(from, toId, exclude) {
    const { childs } = from
    if (!childs || !(childs instanceof Map)) throw new Error(`Incorrect SceneLinker.findChild() argument. ${childs}`)
    const scenes = []

    childs.forEach((value, key) => {
      if (exclude && this.getId(exclude) === key) return
      if (key === toId) {
        scenes.push([value])
      }

      const resArr = this.findChild(value, toId)

      if (resArr.length) {
        resArr.unshift(value)
        scenes.push(resArr)
      }
    })

    if (scenes.length > 1)
      throw new Error(
        `We get more than one way to the scene. [from: ${this.getId(from, true)}, to: ${this.getId(toId, true)}]`,
      )

    return scenes[0] || []
  }
}

module.exports = SceneLinker
