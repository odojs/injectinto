(function() {
  var add, all, bind, bindings, inject, one;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  bindings = {};
  bind = __bind(function(binding, item) {
    var key, value, _results;
    if (item != null) {
      add(binding, item);
      return;
    }
    _results = [];
    for (key in binding) {
      value = binding[key];
      _results.push(add(key, value));
    }
    return _results;
  }, this);
  add = __bind(function(key, value) {
    var result;
    result = [];
    if (bindings[key] != null) {
      result = bindings[key];
    }
    if (Array.isArray(value)) {
      result = result.concat(value);
    } else {
      result.push(value);
    }
    return bindings[key] = result;
  }, this);
  all = __bind(function(value) {
    if (!(bindings[value] != null)) {
      throw new Error('No bindings provided for ' + value);
    }
    return bindings[value];
  }, this);
  one = __bind(function(value) {
    var result;
    result = all(value);
    return result[0];
  }, this);
  inject = module.exports = {
    one: one,
    all: all,
    add: add,
    bind: bind
  };
  inject.bind('banana', '1');
  inject.bind({
    'banana': '2'
  });
  inject.bind({
    banana: '3'
  });
  inject.bind({
    banana: '4',
    fruit: 'so,mething'
  });
  console.log(inject.all('banana'));
  console.log(inject.one('fruit'));
}).call(this);
