const inject = () => {
  let bindings = {}
  return {
    bind: (key, item) => {
      if (typeof(key) === 'object') {
        for (let k in key) res.bind(k, key[k])
        return {
          off: () => {
            for (let k in key) {
              if (bindings[key] == null) continue
              const items = bindings[key]
              const index = items.indexOf(key[k])
              if (index !== -1) items.splice(index, 1)
            }
          }
        }
      }
      if (bindings[key] == null) bindings[key] = []
      if (Array.isArray(item)) {
        bindings[key] = bindings[key].concat(item)
        return {
          off: () => {
            for (let i of item) {
              if (bindings[key] == null) continue
              const items = bindings[key]
              const index = items.indexOf(i)
              if (index !== -1) items.splice(index, 1)
            }
          }
        }
      }

      bindings[key].push(item)
      return {
        off: () => {
          if (bindings[key] == null) return
          const items = bindings[key]
          const index = items.indexOf(item)
          if (index !== -1) items.splice(index, 1)
        }
      }
    },

    one: (key) => {
      if (bindings[key] == null) throw new Error(`${key} not found`)
      const items = bindings[key]
      if (items.length > 1) throw new Error(`${key} too many bound`)
      return items[0]
    },

    oneornone: (key) => {
      if (bindings[key] == null) return null
      const items = bindings[key]
      if (items.length > 1) throw new Error(`${key} too many bound`)
      return items[0]
    },

    first: (key) => {
      if (bindings[key] == null) throw new Error(`${key} not found`)
      return bindings[key][0]
    },

    firstornone: (key) => {
      if (bindings[key] == null) return null
      return bindings[key][0]
    },

    many: (key) => {
      if (bindings[key] == null) return []
      return bindings[key]
    },

    clear: (key) => {
      delete bindings[key]
    },

    clearAll: () => {
      bindings = {}
    }
  }
}

let _inject = null
const assert = () => {
  if (_inject == null) _inject = inject()
  return _inject
}

inject.bind = (key, item) => assert().bind(key, item)
inject.one = (key) => assert().one(key)
inject.oneornone = (key) => assert().oneornone(key)
inject.first = (key) => assert().first(key)
inject.firstornone = (key) => assert().firstornone(key)
inject.many = (key) => assert().many(key)
inject.clear = (key) => assert().clear(key)
inject.clearAll = () => assert().clearAll()
module.exports = inject
