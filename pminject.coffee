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


# provided so even javascript can look nice
inject.bind 'banana', '1'
inject.bind 'banana': '2'
inject.bind banana: '3'
inject.bind
    banana: '4'
    fruit: 'so,mething'

console.log inject.all 'banana'
console.log inject.one 'fruit'

# todo: context, eg singleton, request - need to intergrate with other systems :(