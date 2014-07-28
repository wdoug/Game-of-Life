/*
* This file defines benchmark suites to compare the performance of different
* functions used by the game of life.
*/

/* global WORLD */

// @NOTE: Since Benchmark 'compiles' code so that setup function code runs before
// specific benchmark code, variables are defined in one function scope,
// and used in another. Because of this, I have disabled the jshint warnings
// for these issues on this file.
/* jshint undef: false, unused: false */
/* jshint -W117 */
'use strict';

var perf = perf || {};

(function () {

  var seedOptions = {
    setup: function () {
      var game = new WORLD.Game(5);
    }
  };

  perf.addSuite('Seed', {
    seedZero: function () { game.seedZero(); },
    seedRandom: function () { game.seedRandom(); }
  }, seedOptions);


  perf.renderSuites();

})();
