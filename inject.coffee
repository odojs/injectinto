bind = ->
  class Inject
    constructor: ->
      @bindings = {}

    bind: (key, item) =>
      if typeof key is 'object'
        @bind k, i for k, i of key
        return
      @bindings[key] = [] if !@bindings[key]?
      if Array.isArray item
        @bindings[key] = @bindings[key].concat item
      else
        @bindings[key].push item
    
    one: (key) =>
      throw "#{key} not found" if !@bindings[key]?
      items = @bindings[key]
      throw "#{key} too many bound" if items.length > 1
      items[0]

    oneornone: (key) =>
      return null if !@bindings[key]?
      items = @bindings[key]
      throw "#{key} too many bound" if items.length > 1
      items[0]
    
    first: (key) =>
      throw "#{key} not found" if !@bindings[key]?
      @bindings[key][0]

    firstornone: (key) =>
      return null if !@bindings[key]?
      @bindings[key][0]
    
    many: (key) =>
      return [] if !@bindings[key]?
      @bindings[key]

    clear: (key) => delete @bindings[key]
  
  new Inject

if define?
  define [], bind
else if module?
  module.exports = bind()
else
  window.inject = bind()