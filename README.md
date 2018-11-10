# Dependency Injection

pod.js
```javascript
const inject = require('injectinto')

inject('pod', () => {
  const db = inject.one('db')

  db.key = 'value'
})
```

index.js
```javascript
const inject = require('injectinto')

const db = {}
inject('db', db)

for (let pod of inject.many('pod')) pod()
```

## What is the problem?
I'd like to build systems that can easily be extended, enhanced, or replaced.

## How injectinto solves this problem
1. One or more objects are bound to string keys, for example 'db'
2. Other parts of the code can request objects by providing in the key, for example 'db'

# API
* [<code>inject(key, value)</code>](#bind)
* [<code>inject.bind(key, value)</code>](#bind)
* [<code>inject.unbind(key, value)</code>](#unbind)
* [<code>inject.one(key)</code>](#one)
* [<code>inject.oneornone(key)</code>](#oneornone)
* [<code>inject.many(key)</code>](#many)
* [<code>inject.clear(key)</code>](#clear)
* [<code>inject.reset()</code>](#reset)

<a name="bind"></a>
## `inject(key, value)`
## `inject.bind(key, value)`

Register a value to a string key for retrieval later. Multiple calls will register multiple objects and be accessed via [<code>inject.many(key)</code>](#many)

<a name="unbind"></a>
## `inject.unbind(key, value)`

Remove a registered value for a key. Does not error if value is not found.

<a name="one"></a>
## `inject.one(key)`

Return a single registered value for a given key. Will error if no value is found or if more than one value is found.

<a name="oneornone"></a>
## `inject.oneornone(key)`

Return a single registered value or null for a given key. Will error if more than one value is found.

<a name="many"></a>
## `inject.many(key)`

Return all registered values for a given key. Will return an empty array if no values are registered.

<a name="clear"></a>
## `inject.clear(key)`

Clears all registered values for a given key.

<a name="reset"></a>
## `inject.reset()`

Clears all registered values for all keys.
