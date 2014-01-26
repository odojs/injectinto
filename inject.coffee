bind = ->
  # # Dependency Injection

  class Inject
    constructor: ->
      @bindings = {}

    # app.inject.bind 'item', item
    # app.inject.bind item: item
    # app.inject.bind item: [ item1, item2 ]
    bind: (key, item) =>
      if key is Object key
        for k, i of key
          @bind k, i

        return

      if !@bindings[key]?
        @bindings[key] = []

      if Array.isArray item
        for i in item
          @bindings[key].push i
      else
        @bindings[key].push item
    
    # app.inject.bind 'item', item
    #
    # app.inject.one 'item' # item returned
    #
    # app.inject.one 'thing' # error
    #
    # app.inject.bind 'item', item1
    # app.inject.bind 'item', item2
    #
    # app.inject.one 'item' # error
    one: (key) =>
      if !@bindings[key]?
        throw "[pminject] Nothing bound for '#{key}'!"

      items = @bindings[key]
      if items.length > 1
        throw "[pminject] '#{key}' has too many bindings to inject one!"

      items[0]

    # app.inject.bind 'item', item
    #
    # app.inject.oneornone 'item' # item returned
    # app.inject.oneornone 'thing' # null
    oneornone: (key) =>
      if !@bindings[key]?
        return null

      items = @bindings[key]
      if items.length > 1
        throw "[pminject] '#{key}' has too many bindings to inject oneornone!"
      
      items[0]

    # app.inject.bind 'item', item1
    # app.inject.bind 'item', item2
    #
    # app.inject.first 'item' # item1
    #
    # app.inject.first 'thing' # error
    first: (key) =>
      if !@bindings[key]?
        throw "[pminject] Nothing bound for '#{key}'!"

      @bindings[key][0]

    # app.inject.bind 'item', item1
    # app.inject.bind 'item', item2
    #
    # app.inject.firstornone 'item' # item1
    #
    # app.inject.firstornone 'thing' # null
    firstornone: (key) =>
      if !@bindings[key]?
        return null

      @bindings[key][0]

    # app.inject.bind 'item', item1
    # app.inject.bind 'item', item2
    #
    # app.inject.many 'item' # [ item1, item2 ]
    #
    # app.inject.many 'thing' # []
    many: (key) =>
      if !@bindings[key]?
        return []

      @bindings[key]

    # app.inject.bind 'item', item
    # app.inject.clear()
    #
    # app.inject.one 'item' # error
    clear: (key) =>
      delete @bindings[key]

if define?
  define [], bind
else if module?
  module.exports = bind()
else
  return bind()