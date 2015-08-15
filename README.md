overload-decorator
==================

This library is a solution to a problem which probably didn't exist, and is inspired by [leFunc](https://github.com/jrf0110/leFunc).  If you're coming from a language like C# or Java, maybe you got used to using overloaded methods.  Or maybe you've noticed that the JavaScript Way is to have functions which accept wildly different parameters and attempt to figure out what they've been called with before they can do anything.

Anyways, this little library (45 lines of hand-crafted ES5) gives you an `overload` decorator for use in ES6 classes.

Installation
------------

    $ npm install --save overload-decorator

Usage
-----

Example:

```js
import {overload, defaultOverload} from 'overload-decorator';

class Calculator {
  // we can have an overload that accepts two numbers
  @overload(Number, Number)
  add(a, b) {
    return a + b;
  }

  // and then one that also accepts a callback
  @overload(Number, Number, Function)
  add(a, b, callback) {
    callback(a + b);
  }

  // and you can also have a default one for more complicated stuff
  // e.g., adding up all the arguments and maybe having a callback
  @defaultOverload
  add() {
    let xs = Array.prototype.slice.call(arguments);
    let callback = typeof xs[xs.length - 1] === 'function' ? xs.pop() : null;
    let result = xs.reduce((s, x) => s + x, 0);

    if (callback) {
      callback(result);
    } else {
      return result;
    }
  }
}
```

Just stick a `overload` decorator before your method that states in its arguments what constructors it handles (each overload should have the same name, obviously).  You can use custom classes too.

The `defaultOverload` attribute denotes the overload which should be used if none of the other ones match.  If this isn't specified, and a matching overload isn't found for the arguments the function was called with, an error will be thrown.

An array of supported overloads can be retrieved from the `overloads` property of the overloaded method, in case that is useful to you.


Running the tests
-----------------

    $ npm test

There aren't really much in the way of tests though...

Notes
-----

 * The implementation uses the `.constructor.name` field, so if you try to use this in an old browser, or have other weird stuff going on such as dodgy prototypes or multiple inheritance, it'll break.
 * It uses experimental features of ES2015, namely decorators: proceed with caution.
 * Maybe one day duplicate declarations of methods with the same name will be outlawed.
 * MIT licensed.
