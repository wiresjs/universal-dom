// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license
(function(e){function f(a,c){function b(a){if(!this||this.constructor!==b)return new b(a);this._keys=[];this._values=[];this._itp=[];this.objectOnly=c;a&&v.call(this,a)}c||w(a,"size",{get:x});a.constructor=b;b.prototype=a;return b}function v(a){this.add?a.forEach(this.add,this):a.forEach(function(a){this.set(a[0],a[1])},this)}function d(a){this.has(a)&&(this._keys.splice(b,1),this._values.splice(b,1),this._itp.forEach(function(a){b<a[0]&&a[0]--}));return-1<b}function m(a){return this.has(a)?this._values[b]:
void 0}function n(a,c){if(this.objectOnly&&c!==Object(c))throw new TypeError("Invalid value used as weak collection key");if(c!=c||0===c)for(b=a.length;b--&&!y(a[b],c););else b=a.indexOf(c);return-1<b}function p(a){return n.call(this,this._values,a)}function q(a){return n.call(this,this._keys,a)}function r(a,c){this.has(a)?this._values[b]=c:this._values[this._keys.push(a)-1]=c;return this}function t(a){this.has(a)||this._values.push(a);return this}function h(){(this._keys||0).length=this._values.length=
0}function z(){return k(this._itp,this._keys)}function l(){return k(this._itp,this._values)}function A(){return k(this._itp,this._keys,this._values)}function B(){return k(this._itp,this._values,this._values)}function k(a,c,b){var g=[0],e=!1;a.push(g);return{next:function(){var f,d=g[0];!e&&d<c.length?(f=b?[c[d],b[d]]:c[d],g[0]++):(e=!0,a.splice(a.indexOf(g),1));return{done:e,value:f}}}}function x(){return this._values.length}function u(a,c){for(var b=this.entries();;){var d=b.next();if(d.done)break;
a.call(c,d.value[1],d.value[0],this)}}var b,w=Object.defineProperty,y=function(a,b){return isNaN(a)?isNaN(b):a===b};"undefined"==typeof WeakMap&&(e.WeakMap=f({"delete":d,clear:h,get:m,has:q,set:r},!0));"undefined"!=typeof Map&&"function"===typeof(new Map).values&&(new Map).values().next||(e.Map=f({"delete":d,has:q,get:m,set:r,keys:z,values:l,entries:A,forEach:u,clear:h}));"undefined"!=typeof Set&&"function"===typeof(new Set).values&&(new Set).values().next||(e.Set=f({has:p,add:t,"delete":d,clear:h,
keys:l,values:l,entries:B,forEach:u}));"undefined"==typeof WeakSet&&(e.WeakSet=f({"delete":d,add:t,clear:h,has:p},!0))})("undefined"!=typeof exports&&"undefined"!=typeof global?global:window);
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   3.2.1
 */

(function() {
    "use strict";

    function lib$es6$promise$utils$$objectOrFunction(x) {
        return typeof x === 'function' || (typeof x === 'object' && x !== null);
    }

    function lib$es6$promise$utils$$isFunction(x) {
        return typeof x === 'function';
    }

    function lib$es6$promise$utils$$isMaybeThenable(x) {
        return typeof x === 'object' && x !== null;
    }

    var lib$es6$promise$utils$$_isArray;
    if (!Array.isArray) {
        lib$es6$promise$utils$$_isArray = function(x) {
            return Object.prototype.toString.call(x) === '[object Array]';
        };
    } else {
        lib$es6$promise$utils$$_isArray = Array.isArray;
    }

    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
    var lib$es6$promise$asap$$len = 0;
    var lib$es6$promise$asap$$vertxNext;
    var lib$es6$promise$asap$$customSchedulerFn;

    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
        lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
        lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
        lib$es6$promise$asap$$len += 2;
        if (lib$es6$promise$asap$$len === 2) {
            // If len is 2, that means that we need to schedule an async flush.
            // If additional callbacks are queued before the queue is flushed, they
            // will be processed by this flush that we are scheduling.
            if (lib$es6$promise$asap$$customSchedulerFn) {
                lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
            } else {
                lib$es6$promise$asap$$scheduleFlush();
            }
        }
    }

    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
        lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
    }

    function lib$es6$promise$asap$$setAsap(asapFn) {
        lib$es6$promise$asap$$asap = asapFn;
    }

    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

    // test for web worker but not in IE10
    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
        typeof importScripts !== 'undefined' &&
        typeof MessageChannel !== 'undefined';

    // node
    function lib$es6$promise$asap$$useNextTick() {
        // node version 0.10.x displays a deprecation warning when nextTick is used recursively
        // see https://github.com/cujojs/when/issues/410 for details
        return function() {
            process.nextTick(lib$es6$promise$asap$$flush);
        };
    }

    // vertx
    function lib$es6$promise$asap$$useVertxTimer() {
        return function() {
            lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
        };
    }

    function lib$es6$promise$asap$$useMutationObserver() {
        var iterations = 0;
        var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
        var node = document.createTextNode('');
        observer.observe(node, {
            characterData: true
        });

        return function() {
            node.data = (iterations = ++iterations % 2);
        };
    }

    // web worker
    function lib$es6$promise$asap$$useMessageChannel() {
        var channel = new MessageChannel();
        channel.port1.onmessage = lib$es6$promise$asap$$flush;
        return function() {
            channel.port2.postMessage(0);
        };
    }

    function lib$es6$promise$asap$$useSetTimeout() {
        return function() {
            setTimeout(lib$es6$promise$asap$$flush, 1);
        };
    }

    var lib$es6$promise$asap$$queue = new Array(1000);

    function lib$es6$promise$asap$$flush() {
        for (var i = 0; i < lib$es6$promise$asap$$len; i += 2) {
            var callback = lib$es6$promise$asap$$queue[i];
            var arg = lib$es6$promise$asap$$queue[i + 1];

            callback(arg);

            lib$es6$promise$asap$$queue[i] = undefined;
            lib$es6$promise$asap$$queue[i + 1] = undefined;
        }

        lib$es6$promise$asap$$len = 0;
    }

    function lib$es6$promise$asap$$attemptVertx() {
        try {
            var r = require;
            var vertx = r('vertx');
            lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
            return lib$es6$promise$asap$$useVertxTimer();
        } catch (e) {
            return lib$es6$promise$asap$$useSetTimeout();
        }
    }

    var lib$es6$promise$asap$$scheduleFlush;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (lib$es6$promise$asap$$isNode) {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
    } else if (lib$es6$promise$asap$$isWorker) {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
    } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof require === 'function') {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
    } else {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
    }

    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
        var parent = this;

        var child = new this.constructor(lib$es6$promise$$internal$$noop);

        if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
            lib$es6$promise$$internal$$makePromise(child);
        }

        var state = parent._state;

        if (state) {
            var callback = arguments[state - 1];
            lib$es6$promise$asap$$asap(function() {
                lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
            });
        } else {
            lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
        }

        return child;
    }
    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;

    function lib$es6$promise$promise$resolve$$resolve(object) {
        /*jshint validthis:true */
        var Constructor = this;

        if (object && typeof object === 'object' && object.constructor === Constructor) {
            return object;
        }

        var promise = new Constructor(lib$es6$promise$$internal$$noop);
        lib$es6$promise$$internal$$resolve(promise, object);
        return promise;
    }
    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);

    function lib$es6$promise$$internal$$noop() {}

    var lib$es6$promise$$internal$$PENDING = void 0;
    var lib$es6$promise$$internal$$FULFILLED = 1;
    var lib$es6$promise$$internal$$REJECTED = 2;

    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

    function lib$es6$promise$$internal$$selfFulfillment() {
        return new TypeError("You cannot resolve a promise with itself");
    }

    function lib$es6$promise$$internal$$cannotReturnOwn() {
        return new TypeError('A promises callback cannot return that same promise.');
    }

    function lib$es6$promise$$internal$$getThen(promise) {
        try {
            return promise.then;
        } catch (error) {
            lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
            return lib$es6$promise$$internal$$GET_THEN_ERROR;
        }
    }

    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
        try {
            then.call(value, fulfillmentHandler, rejectionHandler);
        } catch (e) {
            return e;
        }
    }

    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
        lib$es6$promise$asap$$asap(function(promise) {
            var sealed = false;
            var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
                if (sealed) {
                    return;
                }
                sealed = true;
                if (thenable !== value) {
                    lib$es6$promise$$internal$$resolve(promise, value);
                } else {
                    lib$es6$promise$$internal$$fulfill(promise, value);
                }
            }, function(reason) {
                if (sealed) {
                    return;
                }
                sealed = true;

                lib$es6$promise$$internal$$reject(promise, reason);
            }, 'Settle: ' + (promise._label || ' unknown promise'));

            if (!sealed && error) {
                sealed = true;
                lib$es6$promise$$internal$$reject(promise, error);
            }
        }, promise);
    }

    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
        if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
            lib$es6$promise$$internal$$fulfill(promise, thenable._result);
        } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
            lib$es6$promise$$internal$$reject(promise, thenable._result);
        } else {
            lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
                lib$es6$promise$$internal$$resolve(promise, value);
            }, function(reason) {
                lib$es6$promise$$internal$$reject(promise, reason);
            });
        }
    }

    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
        if (maybeThenable.constructor === promise.constructor &&
            then === lib$es6$promise$then$$default &&
            constructor.resolve === lib$es6$promise$promise$resolve$$default) {
            lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
        } else {
            if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
                lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
            } else if (then === undefined) {
                lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
            } else if (lib$es6$promise$utils$$isFunction(then)) {
                lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
            } else {
                lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
            }
        }
    }

    function lib$es6$promise$$internal$$resolve(promise, value) {
        if (promise === value) {
            lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
        } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
            lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
        } else {
            lib$es6$promise$$internal$$fulfill(promise, value);
        }
    }

    function lib$es6$promise$$internal$$publishRejection(promise) {
        if (promise._onerror) {
            promise._onerror(promise._result);
        }

        lib$es6$promise$$internal$$publish(promise);
    }

    function lib$es6$promise$$internal$$fulfill(promise, value) {
        if (promise._state !== lib$es6$promise$$internal$$PENDING) {
            return;
        }

        promise._result = value;
        promise._state = lib$es6$promise$$internal$$FULFILLED;

        if (promise._subscribers.length !== 0) {
            lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
        }
    }

    function lib$es6$promise$$internal$$reject(promise, reason) {
        if (promise._state !== lib$es6$promise$$internal$$PENDING) {
            return;
        }
        promise._state = lib$es6$promise$$internal$$REJECTED;
        promise._result = reason;

        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
    }

    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
        var subscribers = parent._subscribers;
        var length = subscribers.length;

        parent._onerror = null;

        subscribers[length] = child;
        subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
        subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection;

        if (length === 0 && parent._state) {
            lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
        }
    }

    function lib$es6$promise$$internal$$publish(promise) {
        var subscribers = promise._subscribers;
        var settled = promise._state;

        if (subscribers.length === 0) {
            return;
        }

        var child, callback, detail = promise._result;

        for (var i = 0; i < subscribers.length; i += 3) {
            child = subscribers[i];
            callback = subscribers[i + settled];

            if (child) {
                lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
            } else {
                callback(detail);
            }
        }

        promise._subscribers.length = 0;
    }

    function lib$es6$promise$$internal$$ErrorObject() {
        this.error = null;
    }

    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
        try {
            return callback(detail);
        } catch (e) {
            lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
            return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
        }
    }

    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
        var hasCallback = lib$es6$promise$utils$$isFunction(callback),
            value, error, succeeded, failed;

        if (hasCallback) {
            value = lib$es6$promise$$internal$$tryCatch(callback, detail);

            if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
                failed = true;
                error = value.error;
                value = null;
            } else {
                succeeded = true;
            }

            if (promise === value) {
                lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
                return;
            }

        } else {
            value = detail;
            succeeded = true;
        }

        if (promise._state !== lib$es6$promise$$internal$$PENDING) {
            // noop
        } else if (hasCallback && succeeded) {
            lib$es6$promise$$internal$$resolve(promise, value);
        } else if (failed) {
            lib$es6$promise$$internal$$reject(promise, error);
        } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
            lib$es6$promise$$internal$$fulfill(promise, value);
        } else if (settled === lib$es6$promise$$internal$$REJECTED) {
            lib$es6$promise$$internal$$reject(promise, value);
        }
    }

    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
        try {
            resolver(function resolvePromise(value) {
                lib$es6$promise$$internal$$resolve(promise, value);
            }, function rejectPromise(reason) {
                lib$es6$promise$$internal$$reject(promise, reason);
            });
        } catch (e) {
            lib$es6$promise$$internal$$reject(promise, e);
        }
    }

    var lib$es6$promise$$internal$$id = 0;

    function lib$es6$promise$$internal$$nextId() {
        return lib$es6$promise$$internal$$id++;
    }

    function lib$es6$promise$$internal$$makePromise(promise) {
        promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
        promise._state = undefined;
        promise._result = undefined;
        promise._subscribers = [];
    }

    function lib$es6$promise$promise$all$$all(entries) {
        return new lib$es6$promise$enumerator$$default(this, entries).promise;
    }
    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;

    function lib$es6$promise$promise$race$$race(entries) {
        /*jshint validthis:true */
        var Constructor = this;

        if (!lib$es6$promise$utils$$isArray(entries)) {
            return new Constructor(function(resolve, reject) {
                reject(new TypeError('You must pass an array to race.'));
            });
        } else {
            return new Constructor(function(resolve, reject) {
                var length = entries.length;
                for (var i = 0; i < length; i++) {
                    Constructor.resolve(entries[i]).then(resolve, reject);
                }
            });
        }
    }
    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;

    function lib$es6$promise$promise$reject$$reject(reason) {
        /*jshint validthis:true */
        var Constructor = this;
        var promise = new Constructor(lib$es6$promise$$internal$$noop);
        lib$es6$promise$$internal$$reject(promise, reason);
        return promise;
    }
    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

    function lib$es6$promise$promise$$needsResolver() {
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function lib$es6$promise$promise$$needsNew() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise's eventual value or the reason
      why the promise cannot be fulfilled.

      Terminology
      -----------

      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.

      A promise can be in one of three states: pending, fulfilled, or rejected.

      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.

      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.


      Basic Usage:
      ------------

      ```js
      var promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);

        // on failure
        reject(reason);
      });

      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Advanced Usage:
      ---------------

      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.

      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          var xhr = new XMLHttpRequest();

          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();

          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }

      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Unlike callbacks, promises are great composable primitives.

      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON

        return values;
      });
      ```

      @class Promise
      @param {function} resolver
      Useful for tooling.
      @constructor
    */
    function lib$es6$promise$promise$$Promise(resolver) {
        this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
        this._result = this._state = undefined;
        this._subscribers = [];

        if (lib$es6$promise$$internal$$noop !== resolver) {
            typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
            this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
        }
    }

    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

    lib$es6$promise$promise$$Promise.prototype = {
        constructor: lib$es6$promise$promise$$Promise,

        /**
          The primary way of interacting with a promise is through its `then` method,
          which registers callbacks to receive either a promise's eventual value or the
          reason why the promise cannot be fulfilled.

          ```js
          findUser().then(function(user){
            // user is available
          }, function(reason){
            // user is unavailable, and you are given the reason why
          });
          ```

          Chaining
          --------

          The return value of `then` is itself a promise.  This second, 'downstream'
          promise is resolved with the return value of the first promise's fulfillment
          or rejection handler, or rejected if the handler throws an exception.

          ```js
          findUser().then(function (user) {
            return user.name;
          }, function (reason) {
            return 'default name';
          }).then(function (userName) {
            // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
            // will be `'default name'`
          });

          findUser().then(function (user) {
            throw new Error('Found user, but still unhappy');
          }, function (reason) {
            throw new Error('`findUser` rejected and we're unhappy');
          }).then(function (value) {
            // never reached
          }, function (reason) {
            // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
            // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
          });
          ```
          If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

          ```js
          findUser().then(function (user) {
            throw new PedagogicalException('Upstream error');
          }).then(function (value) {
            // never reached
          }).then(function (value) {
            // never reached
          }, function (reason) {
            // The `PedgagocialException` is propagated all the way down to here
          });
          ```

          Assimilation
          ------------

          Sometimes the value you want to propagate to a downstream promise can only be
          retrieved asynchronously. This can be achieved by returning a promise in the
          fulfillment or rejection handler. The downstream promise will then be pending
          until the returned promise is settled. This is called *assimilation*.

          ```js
          findUser().then(function (user) {
            return findCommentsByAuthor(user);
          }).then(function (comments) {
            // The user's comments are now available
          });
          ```

          If the assimliated promise rejects, then the downstream promise will also reject.

          ```js
          findUser().then(function (user) {
            return findCommentsByAuthor(user);
          }).then(function (comments) {
            // If `findCommentsByAuthor` fulfills, we'll have the value here
          }, function (reason) {
            // If `findCommentsByAuthor` rejects, we'll have the reason here
          });
          ```

          Simple Example
          --------------

          Synchronous Example

          ```javascript
          var result;

          try {
            result = findResult();
            // success
          } catch(reason) {
            // failure
          }
          ```

          Errback Example

          ```js
          findResult(function(result, err){
            if (err) {
              // failure
            } else {
              // success
            }
          });
          ```

          Promise Example;

          ```javascript
          findResult().then(function(result){
            // success
          }, function(reason){
            // failure
          });
          ```

          Advanced Example
          --------------

          Synchronous Example

          ```javascript
          var author, books;

          try {
            author = findAuthor();
            books  = findBooksByAuthor(author);
            // success
          } catch(reason) {
            // failure
          }
          ```

          Errback Example

          ```js

          function foundBooks(books) {

          }

          function failure(reason) {

          }

          findAuthor(function(author, err){
            if (err) {
              failure(err);
              // failure
            } else {
              try {
                findBoooksByAuthor(author, function(books, err) {
                  if (err) {
                    failure(err);
                  } else {
                    try {
                      foundBooks(books);
                    } catch(reason) {
                      failure(reason);
                    }
                  }
                });
              } catch(error) {
                failure(err);
              }
              // success
            }
          });
          ```

          Promise Example;

          ```javascript
          findAuthor().
            then(findBooksByAuthor).
            then(function(books){
              // found books
          }).catch(function(reason){
            // something went wrong
          });
          ```

          @method then
          @param {Function} onFulfilled
          @param {Function} onRejected
          Useful for tooling.
          @return {Promise}
        */
        then: lib$es6$promise$then$$default,

        /**
          `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
          as the catch block of a try/catch statement.

          ```js
          function findAuthor(){
            throw new Error('couldn't find that author');
          }

          // synchronous
          try {
            findAuthor();
          } catch(reason) {
            // something went wrong
          }

          // async with promises
          findAuthor().catch(function(reason){
            // something went wrong
          });
          ```

          @method catch
          @param {Function} onRejection
          Useful for tooling.
          @return {Promise}
        */
        'catch': function(onRejection) {
            return this.then(null, onRejection);
        }
    };
    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
        this._instanceConstructor = Constructor;
        this.promise = new Constructor(lib$es6$promise$$internal$$noop);

        if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
            lib$es6$promise$$internal$$makePromise(this.promise);
        }

        if (Array.isArray(input)) {
            this._input = input;
            this.length = input.length;
            this._remaining = input.length;

            this._result = new Array(this.length);

            if (this.length === 0) {
                lib$es6$promise$$internal$$fulfill(this.promise, this._result);
            } else {
                this.length = this.length || 0;
                this._enumerate();
                if (this._remaining === 0) {
                    lib$es6$promise$$internal$$fulfill(this.promise, this._result);
                }
            }
        } else {
            lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
        }
    }

    function lib$es6$promise$enumerator$$validationError() {
        return new Error('Array Methods must be provided an Array');
    }

    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
        var length = this.length;
        var input = this._input;

        for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
            this._eachEntry(input[i], i);
        }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
        var c = this._instanceConstructor;
        var resolve = c.resolve;

        if (resolve === lib$es6$promise$promise$resolve$$default) {
            var then = lib$es6$promise$$internal$$getThen(entry);

            if (then === lib$es6$promise$then$$default &&
                entry._state !== lib$es6$promise$$internal$$PENDING) {
                this._settledAt(entry._state, i, entry._result);
            } else if (typeof then !== 'function') {
                this._remaining--;
                this._result[i] = entry;
            } else if (c === lib$es6$promise$promise$$default) {
                var promise = new c(lib$es6$promise$$internal$$noop);
                lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
                this._willSettleAt(promise, i);
            } else {
                this._willSettleAt(new c(function(resolve) {
                    resolve(entry);
                }), i);
            }
        } else {
            this._willSettleAt(resolve(entry), i);
        }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
        var promise = this.promise;

        if (promise._state === lib$es6$promise$$internal$$PENDING) {
            this._remaining--;

            if (state === lib$es6$promise$$internal$$REJECTED) {
                lib$es6$promise$$internal$$reject(promise, value);
            } else {
                this._result[i] = value;
            }
        }

        if (this._remaining === 0) {
            lib$es6$promise$$internal$$fulfill(promise, this._result);
        }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
        var enumerator = this;

        lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
            enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
        }, function(reason) {
            enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
        });
    };

    function lib$es6$promise$polyfill$$polyfill() {
        var local;

        if (typeof global !== 'undefined') {
            local = global;
        } else if (typeof self !== 'undefined') {
            local = self;
        } else {
            try {
                local = Function('return this')();
            } catch (e) {
                throw new Error('polyfill failed because global object is unavailable in this environment');
            }
        }

        var P = local.Promise;

        if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
            return;
        }

        local.Promise = lib$es6$promise$promise$$default;
    }
    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

    var lib$es6$promise$umd$$ES6Promise = {
        'Promise': lib$es6$promise$promise$$default,
        'polyfill': lib$es6$promise$polyfill$$default
    };

    /* global define:true module:true window: true */
    if (typeof define === 'function' && define['amd']) {
        define(function() {
            return lib$es6$promise$umd$$ES6Promise;
        });
    } else if (typeof module !== 'undefined' && module['exports']) {
        module['exports'] = lib$es6$promise$umd$$ES6Promise;
    } else if (typeof this !== 'undefined') {
        this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
    }

    lib$es6$promise$polyfill$$default();
}).call(this);