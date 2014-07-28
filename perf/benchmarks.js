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
    seedZero: function () {
      game.seedZero();
    },
    seedRandom: function () {
      game.seedRandom();
    }
  }, seedOptions);


  var algorithmOptions = {
    setup: function () {
      var game = new WORLD.Game(5);
      game.currentBoard =  [[0, 1, 0, 0, 0],
                            [1, 0, 0, 1, 1],
                            [1, 1, 0, 0, 1],
                            [0, 1, 0, 0, 0],
                            [1, 0, 0, 0, 1]];
    }
  };

  perf.addSuite('Game Algorithm 5x5', {
    map: function () {
      game.algMap();
    },
    edgesSeparate: function () {
      game.algEdgesSeparate();
    }
  }, seedOptions);


  var largerBoardOptions = {
    setup: function () {
      var game = new WORLD.Game(20);
      game.seedRandom();
    }
  };

  perf.addSuite('Game Algorithm 20x20 random seed', {
    map: function () {
      game.algMap();
    },
    edgesSeparate: function () {
      game.algEdgesSeparate();
    }
  }, largerBoardOptions);


  perf.renderSuites();

})();
