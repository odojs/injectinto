bindings = {}

bind = (binding, item) =>
    if item?
        add(binding, item)
        return;
    
    for key, value of binding
        add(key, value)

add = (key, value) =>
    # console.log 'binding ' + key + ' to: ' + value
    result = []
    if bindings[key]?
        result = bindings[key]
    
    if Array.isArray value
        result = result.concat value
    else
        result.push value
    
    bindings[key] = result

all = (value) =>
    if !bindings[value]?
        throw new Error 'No bindings provided for ' + value
    
    return bindings[value]

one = (value) =>
    result = all value
    
    return result[0]

inject = module.exports =
    one: one
    all: all
    add: add
    bind: bind