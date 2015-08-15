
function overload(name) {
  return function (target, key, descriptor) {
    var fn = target[key];

    if (!fn) {
      fn = function overloader() {
        var name = Array.prototype.map.call(arguments, function (x) {
          return x.constructor.name;
        }).join();

        var fn = overloader.overloads[name] || overloader.overloads['default'];

        if (!fn) {
          throw new Error('cannot find overload for ' + key + '(' + name + ')');
        } else {
          return fn.apply(this, arguments);
        }
      };

      fn.overloads = {};

    } else if (fn.overloads[name]) {
      if (name === 'default') {
        throw new Error('duplicate declaration of default override for ' + key + '()');
      } else {
        throw new Error('duplicate declaration of ' + key + '(' + name + ')');
      }
    }

    fn.overloads[name] = descriptor.value;
    descriptor.value = fn;
    return descriptor;
  };
}

module.exports.overload = function () {
  var name = Array.prototype.map.call(arguments, function (x) {
    return x.name;
  }).join();

  return overload(name);
};

module.exports.defaultOverload = overload('default');
