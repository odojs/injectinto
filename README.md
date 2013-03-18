Dependency Injection
--------------------

config.coffee
```coffeescript
inject = require 'pminject'

inject.bind templaterenderer: require 'nun'
inject.bind contenttypes: [
    require './contenttypes/text'
    require './contenttypes/image'
]
```

cms.coffee
```coffeescript 
inject = require 'pminject'

contenttypes = inject.many 'contenttypes'
templaterenderer = inject.one 'templaterenderer'

for contenttype in contenttypes
    templaterenderer.render contenttype
```


What is the problem?
--------------------

I'd like to build systems that can easily be extended, enhanced, or replaced.


How injectinto solves this problem
----------------------------------

1. Extension points are defined through strings, for example 'templateengine'
2. In configuration these extension points are bound to actual objects
3. A module asks for an object via it's string, for example 'templateengine'
4. Some modules can expect an array of objects


Goals
------

1. Simple
2. Work with async
3. Allow multiple registrations