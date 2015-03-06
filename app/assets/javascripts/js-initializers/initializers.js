// Copyright (c) 2015 Nahuel Cuesta Luengo <nahuelcuestaluengo@gmail.com>
//
// Injectable initializers micro-framework
//
// This allows for decoupled addition of new javascript initializers into your
// regular workflow and unobstrusively running the code, both with the winning
// of modularity -you can organize every piece of JS code in different files-
// and clarity. You can either have your scripts run on every page load, or
// only when a certain condition is met, which even will boost the performance
// of your application on the client side by only running the necessary JS for
// each situation.
//
// Initializers may provide the minimum necessary logic to get up and running
// with a third-party JS library, preparing target elements for usage and/or
// add complex logic to the page to initialize a super cool UX bloated with
// in-house JS code.
//
// Usage:
//   Add an initializer with the initialization logic:
//
//     // app/assets/javascripts/initializers/alert.js
//     (function($) {
//       Initializers.register('alert', function() {
//         $('a').on('click', function() { alert('Hey there!'); });
//       });
//     }(jQuery))
//
//   Once the initializer is registered, it will be automatically run
//   on every page load (or page:change event, if using Turbolinks),
//   so go refresh that page and see those alerts pop up!
//
// Using conditions:
//   An initializer with a condition guard will only get run when its guard
//   evaluates to a truthy value:
//
//     // app/assets/javascripts/initializers/fridays.js
//     (function() {
//       function party() {
//         alert('Today is friday! w00t!');
//       }
//
//       function isFriday() {
//         return (new Date()).getDay() === 5;
//       }
//
//       Initializers.register('fridays', party, isFriday);
//     }())
//
//   Once the initializer is registered, it will run only when its condition
//   returns true.
//
// Running the initializers without jQuery:
//   If the page where js-initializers is included has jQuery loaded, all
//   registerd initializers will be automatically run on page load. But what
//   about non-jQuery pages? Those pages only ned to have the following snippet
//   after the page has been loaded:
//
//     Initializers.run()
//
//   And that's it! Pretty straight-forward, huh?
window.Initializers = (function($, doc, undefined) {
  var I = {}, initializers = {};

  /**
   * Default condition function: always returns true.
   * By default any initializer will be run.
   */
  function defaultCondition() {
    return true;
  }

  /**
   * Error reporting helper.
   */
  function error(message) {
    if (window.console && window.console.error) {
      console.error(message);
    }
  }

  /**
   * Adds a new element to the list of registered initializers.
   * Once an initializer is registered, it becomes instantly available to the
   * `Initializers.run()` method.
   *
   * Trying to overwrite an existing initializer won't affect the state of the
   * existing one, instead will yield an error on the console -if possible-.
   *
   *     // Register an initializer that alerts 'meow' on every page load
   *     // only if the user is 'catlover492'
   *     Initializer.register(
   *       'meow',
   *       function() { alert('meow'); },
   *       function() { return window.user === 'catlover492' }
   *     )
   */
  I.register = function(name, initializer, condition) {
    if (initializers[name] !== undefined) {
      error('Cowardly refusing to overwrite existing initializer: ' + name);
    } else {
      initializers[name] = { condition: condition || defaultCondition,
                             logic: initializer };
    }
  };

  /**
   * Removes an initializer from the registered ones so it's no longer
   * avaiable to the `Initializers.run()` function.
   *
   *     Initializers.unregister('alert')
   */
  I.unregister = function(name) {
    if (initializers[name] === undefined) {
      delete initializers[name];
    } else {
      error('Trying to unregister unknown initializer: ' + name);
    }
  };

  /**
   * Goes through all the registered initializers, checking the condition block
   * provided for each of them and running the logic of every initializer whose
   * condition block returns a truthy value.
   *
   * Returns an array with the names of the initializers that were run.
   *
   *     Initializers.run()
   *     //=> ['alert', 'snowPage', 'marquee']
   *
   * This function may be called any number of times, but bear in mind that any
   * non-idempotent initializer may result in an unexpected/undesired behavior.
   * It's entirely up to the implementer of the initializer to provide with a
   * safe logic
   */
  I.run = function() {
    var run = [];
    for (var name in initializers) {
      if (initializers[name].condition.apply()) {
        initializers[name].logic.apply(this);
        run.push(name);
      }
    }
    return run;
  };

  /**
   * Returns all registered initializers at the moment of invocation,
   * as known by the microframework:
   *
   *     Initializers.registered()
   *     //=> {alert: {condition: function() {...}, logic: function() {...}}}
   */
  I.registered = function() {
    return initializers;
  };

  // If jQuery is available, automatically run registed initializers
  if ($ !== undefined) {
    // Trigger initializers on page load (either with Turbolinks or without 'em)
    if (window.Turbolinks === undefined) {
      $($.runInitializers);
    } else {
      $(doc).on('page:change', $.runInitializers);
    }
  }

  return I;
}(jQuery, document));
