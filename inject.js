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

let _inject = inject()
module.exports = (key, item) => {
  if (key == null) return inject()
  return _inject.bind(key, item)
}
module.exports.bind = (key, item) => _inject.bind(key, item)
module.exports.one = (key) => _inject.one(key)
module.exports.oneornone = (key) => _inject.oneornone(key)
module.exports.first = (key) => _inject.first(key)
module.exports.firstornone = (key) => _inject.firstornone(key)
module.exports.many = (key) => _inject.many(key)
module.exports.clear = (key) => _inject.clear(key)
module.exports.clearAll = () => _inject.clearAll()
