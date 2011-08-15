Poor Man's Dependency Injection
===============================

Example (CoffeeScript)
----------------------

config.coffee
    
    inject = require 'pminject'
    
    inject.bind templaterenderer: require 'nun'
    inject.bind contenttypes: [
        require './contenttypes/text'
        require './contenttypes/image'
    ]


cms.coffee
    
    inject = require 'pminject'
    
    contenttypes = inject.all 'contenttypes'
    templaterenderer = inject.one 'templaterenderer'
    
    for contenttype in contenttypes
        templaterenderer.render contenttype



What is the problem?
--------------------

I'd like to build systems that can easily be extended, enhanced, or replaced.


How PMInject solves this problem
--------------------------------

1. Extension points are defined through strings, for example 'templateengine'
2. In configuration these extension points are bound to actual objects
3. A module asks for an object via it's string, for example 'templateengine'
4. Some modules can expect an array of objects


Goals
------

1. Simple
2. Work with async
3. Allow multiple registrations


Planned Features
----------------

1. Scope for creating new instances
2. Using the requesting module to map to an instance
3. Various other features that are appropriate from NInject